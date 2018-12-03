import moment from 'moment';

export const formatUnixToDate = unit => moment.unix(unit).format();

export const formatDateRange = (startTime, endTime) => {
  const startTimeStr = moment(startTime).format('MMM DD');
  const endTimeStr = moment(endTime).format('MMM DD');
  return `${startTimeStr} - ${endTimeStr}`;
};

export const formatDate = time => {
  return `${moment(time).format('DD MMM YYYY')} `;
};
export const formatDurationTime = duration => {
  // console.log(duration);

  // const hours = Math.floor(duration);
  // const minutes = Math.round((duration - hours) * 60);
  const minutes =
    duration._data.minutes < 0
      ? duration._data.minutes * -1
      : duration._data.minutes;
  return `${duration._data.hours} H ${minutes} MIN`;
};
export const upperFirstChar = text => {
  return text.replace(/\w\S*/g, txt => {
    return txt.charAt(0).toUpperCase() + txt.substr(1);
  });
};
export const lowerFirstChar = text => {
  return text.charAt(0).toLowerCase() + text.substr(1);
};
export const replaceAll = (text, search, replacement) => {
  return text.replace(new RegExp(search, 'g'), replacement);
};

export const makeActionName = text => {
  return lowerFirstChar(
    replaceAll(
      upperFirstChar(replaceAll(text, '_', ' ').toLowerCase()),
      ' ',
      ''
    )
  );
};

export const formatMoney = (number, n = 2, x = 3) => {
  const re = `\\d(?=(\\d{${x}})+${n > 0 ? '\\.' : '$'})`;
  return Number(number)
    .toFixed(Math.max(0, ~~n))
    .replace(new RegExp(re, 'g'), '$& ');
};

export const fromNow = date => {
  return moment(date).fromNow();
};
