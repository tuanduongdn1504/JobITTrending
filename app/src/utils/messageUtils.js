import moment from 'moment';

export function isSameDay(currentMessage = {}, diffMessage = {}) {
  if (!diffMessage.time) {
    return false;
  }

  const currentCreatedAt = moment(currentMessage.time);
  const diffCreatedAt = moment(diffMessage.time);

  if (!currentCreatedAt.isValid() || !diffCreatedAt.isValid()) {
    return false;
  }

  return currentCreatedAt.isSame(diffCreatedAt, 'day');
}

export function isSameUser(currentMessage = {}, diffMessage = {}) {
  return !!(diffMessage.sender === currentMessage.sender);
}
