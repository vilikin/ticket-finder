/* global gapi */

import * as _ from 'lodash';
import {
  getTextBetween,
  timeAndDateStringsToMoment,
} from '../utils/helpers';

import base64url from 'base64url';

export class TicketFinder {
  constructor(gmailClient) {
    this.gmailClient = gmailClient;
  }

  async *findMostRelevantTickets() {
    const { gmailClient } = this;
    const messages = await gmailClient.findMessagesByQuery('Matkalippu from:tickets@vr.fi');
  
    const messageIds = _.chain(messages)
      .map('id')
      .slice(0, 4)
      .value();
  
    console.log(messageIds);
  
    let stopOnNextNonRelevantTicket = false;
    let currentMessageIndex = 0;
    let foundMostRelevantTicket = false;
    
    while (!foundMostRelevantTicket && currentMessageIndex < messageIds.length) {
      try {
        const messageId = messageIds[currentMessageIndex];
        const message = await gmailClient.getMessageDetails(messageId);
  
        const ticket = messageHtmlToTicketObject(message.textHtml);
        const attachmentId = _.first(message.inline).attachmentId;
        const attachment = await gmailClient.getAttachment(messageId, attachmentId);
        
        const ticketWithQrCodeDataURI = {
          ...ticket,
          id: messageId,
          qrCodeDataURI: attachmentToDataURI(attachment.data),
        };
  
        yield ticketWithQrCodeDataURI;
      } catch (err) {
        console.error(`Failed to parse message`, err);
      }
  
      currentMessageIndex += 1;
    }
  }
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
  
  const startDate = timeAndDateStringsToMoment(from.time, dateRaw);
  const endDate = timeAndDateStringsToMoment(to.time, dateRaw);
  
  const train = getTextBetween(messageHtml,
      '<span style="font-size:14px;line-height:1.5;">', ',');
  const wagon = getTextBetween(messageHtml,
      '<b style="font-size:24px;line-height:1.5;color:#077f00;">', ' </b>');
  const seat = getTextBetween(messageHtml,
      '<b style="font-size:24px;line-height:1.5;color:#077f00;">', ' </b>', 2);
  const type = getTextBetween(messageHtml,
      '<span style="font-size:16px;">', '</span>', 2);

  return {
    from: from.location,
    to: to.location,
    startDate,
    endDate,
    train,
    wagon,
    seat,
    type,
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
