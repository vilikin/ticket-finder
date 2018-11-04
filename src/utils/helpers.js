import * as moment from 'moment';

export function getTextBetween(full, start, end, splitStartIndex = 1) {
  return full.split(start)[splitStartIndex].split(end)[0];
}

export function timeAndDateStringsToMoment(timeString, dateString) {
  const dateFormat = 'DD.MM.YYYY HH:mm'
  const combinedString = `${dateString} ${timeString}`;
  return moment(combinedString, dateFormat);
}
