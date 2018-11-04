import * as _ from 'lodash';
import {
  getTextBetween,
  timeAndDateStringsToMoment,
} from '../utils/helpers';

import * as moment from 'moment';
import base64url from 'base64url';

const params = new URLSearchParams(window.location.search);
const DEBUG_MODE = params.get('debug') === 'true';

if (DEBUG_MODE) {
  console.warn('TicketCore is in debug mode!');
}

export const TicketRelevancy = {
  NON_RELEVANT: 'NON_RELEVANT',
  CURRENT: 'CURRENT',
  UPCOMING: 'UPCOMING',
};

export const ResultType = {
  TICKET: 'TICKET',
  ERROR: 'ERROR',
  NON_RELEVANT: 'NON_RELEVANT',
}

function createYieldableResult(resultType, result) {
  return {
    resultType,
    result,
  };
}

export class TicketFinder {
  constructor(gmailClient) {
    this.gmailClient = gmailClient;
  }

  async *findRelevantTickets() {
    const { gmailClient } = this;
    const messages = await gmailClient.findMessagesByQuery('Matkalippu from:tickets@vr.fi');
  
    const messageIds = _.map(messages, 'id');
  
    console.log(messageIds);
  
    let stopOnNextNonRelevantTicket = false;
    
    for (const messageId of messageIds) {
      try {
        const message = await gmailClient.getMessageDetails(messageId);
  
        const ticket = messageHtmlToTicketObject(message.textHtml);
        const ticketRelevancy = getTicketRelevancy(ticket.tripStartDate, ticket.tripEndDate);

        // if ticket is non relevant, don't fetch more data and prepare to stop
        if (ticketRelevancy === TicketRelevancy.NON_RELEVANT) {
          yield createYieldableResult(ResultType.NON_RELEVANT);
          console.log('Encountered non-relevant ticket');

          if (stopOnNextNonRelevantTicket) {
            console.log('Stopping.');
            // if previous ticket was also non relevant, assume there will be no more relevant tickets
            break;
          }

          console.log('Stopping if next ticket is also non-relevant');
          stopOnNextNonRelevantTicket = true;
          continue;
        }

        const attachmentId = _.first(message.inline).attachmentId;
        const attachment = await gmailClient.getAttachment(messageId, attachmentId);

        console.log(`Yielding ${ticketRelevancy} ticket`);
  
        const result = {
          ...ticket,
          id: messageId,
          relevancy: ticketRelevancy,
          qrCodeDataURI: attachmentToDataURI(attachment.data),
        };

        yield createYieldableResult(ResultType.TICKET, result);
      } catch (err) {
        yield createYieldableResult(ResultType.ERROR, err);
      }
    }
  }
}

function getTicketRelevancy(tripStartDate, tripEndDate) {
  const now = DEBUG_MODE ? moment('2018-10-24 08:30') : moment();

  if (now.isAfter(tripEndDate)) {
    return TicketRelevancy.NON_RELEVANT;
  }

  if (now.isBefore(tripStartDate)) {
    return TicketRelevancy.UPCOMING;
  }

  return TicketRelevancy.CURRENT;
}

function attachmentToDataURI(attachmentData) {
  // Gmail API gives us a Base64_urlencoded image
  // We need to convert it to normal Base64 for data URI
  const base64Image = base64url.toBase64(attachmentData);
  return `data:image/png;base64,${base64Image}`;
}

function messageHtmlToTicketObject(messageHtml) {
  const from = parseFrom(messageHtml);
  const to = parseTo(messageHtml);
  const dateRaw = getTextBetween(messageHtml,
      '<span style="color:#077f00;">', '</span>', 2);
  
  const tripStartDate = timeAndDateStringsToMoment(from.time, dateRaw);
  const tripEndDate = timeAndDateStringsToMoment(to.time, dateRaw);
  
  const train = getTextBetween(messageHtml,
      '<span style="font-size:14px;line-height:1.5;">', ',');
  const wagon = getTextBetween(messageHtml,
      '<b style="font-size:24px;line-height:1.5;color:#077f00;">', ' </b>');
  const seat = getTextBetween(messageHtml,
      '<b style="font-size:24px;line-height:1.5;color:#077f00;">', ' </b>', 2);
  const ticketFor = getTextBetween(messageHtml,
      '<span style="font-size:16px;">', '</span>', 2);

  return {
    tripStartLocation: from.location,
    tripEndLocation: to.location,
    tripStartDate,
    tripEndDate,
    train,
    wagon,
    seat,
    ticketFor,
  };
}

function parseFrom(messageHtml) {
  const full = getTextBetween(
    messageHtml,
    '<td width="90%" valign="top" style="color:#4F5D5D;line-height:1.2;" rowspan="1" colspan="1">',
    '</td>',
  );
  
  const time = getTextBetween(full, '<span style="font-size:16px;">', ' </span>');
  const location = getTextBetween(full, '<b style="font-size:16px;">', ' →</b>');

  return {
    time,
    location,
  };
}

function parseTo(messageHtml) {
  const full = getTextBetween(
    messageHtml,
    '<td width="90%" style="color:#4F5D5D;padding-top:5px;" rowspan="1" colspan="1">',
    '</td>',
  );
  
  const time = getTextBetween(full, '<span style="font-size:16px;line-height:1.2;">', ' </span>');
  const location = getTextBetween(full, '<b style="font-size:16px;line-height:1.2;">', '</b>');

  return {
    time,
    location,
  };
}
