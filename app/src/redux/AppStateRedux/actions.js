import { makeActionCreator, makeConstantCreator } from '../../utils/reduxUtils';

export const AppStateTypes = makeConstantCreator(
  'SHOW_ALERT_MESSAGE',
  'CLEAR_ALERT_MESSAGE',

  'PUSH_NOTIFICATION_TOKEN',
  'PUSH_NOTIFICATION_TOKEN_SUCCESS',
  'PUSH_NOTIFICATION_TOKEN_FAILURE',

  'GET_NOTIFICATION',
  'GET_NOTIFICATION_SUCCESS',
  'GET_NOTIFICATION_FAILURE'
);

const showAlertMessage = (name, alertType, params) =>
  makeActionCreator(AppStateTypes.SHOW_ALERT_MESSAGE, {
    name,
    alertType,
    params
  });
const clearAlertMessage = name =>
  makeActionCreator(AppStateTypes.CLEAR_ALERT_MESSAGE, { name });

const pushNotificationToken = token =>
  makeActionCreator(AppStateTypes.PUSH_NOTIFICATION_TOKEN, { token });
const pushNotificationTokenSuccess = response =>
  makeActionCreator(AppStateTypes.PUSH_NOTIFICATION_TOKEN_SUCCESS, {
    response
  });
const pushNotificationTokenFailure = error =>
  makeActionCreator(AppStateTypes.PUSH_NOTIFICATION_TOKEN_FAILURE, { error });

const getNotification = () => makeActionCreator(AppStateTypes.GET_NOTIFICATION);
const getNotificationSuccess = response =>
  makeActionCreator(AppStateTypes.GET_NOTIFICATION_SUCCESS, { response });
const getNotificationFailure = error =>
  makeActionCreator(AppStateTypes.GET_NOTIFICATION_FAILURE, { error });

export default {
  showAlertMessage,
  clearAlertMessage,

  pushNotificationToken,
  pushNotificationTokenSuccess,
  pushNotificationTokenFailure,

  getNotification,
  getNotificationSuccess,
  getNotificationFailure
};
