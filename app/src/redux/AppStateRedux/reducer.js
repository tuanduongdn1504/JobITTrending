import Immutable from 'seamless-immutable';
import { AppStateTypes } from './actions';
// import { LoginTypes as AppLoginTypes } from '../AppRedux/actions';
import { makeReducerCreator } from '../../utils/reduxUtils';

export const INITIAL_STATE = Immutable({
  alerts: {},
  resultToken: null,
  error: null,
  notificationData: []
});

export const showAlertMessage = (state, { name, alertType, params }) =>
  state.setIn(['alerts', name], {
    alertType,
    params
  });

export const clearAlertMessage = (state, { name }) =>
  state.setIn(['alerts', name], null);

export const pushNotificationToken = (state, { token }) => state.merge({});
export const pushNotificationTokenSuccess = (state, { response }) =>
  state.merge({ resultToken: response });
export const pushNotificationTokenFailure = (state, { error }) =>
  state.merge({ error });

export const getNotification = state => state.merge({});
export const getNotificationSuccess = (state, { response }) =>
  state.merge({ notificationData: response });
export const getNotificationFailure = (state, { error }) =>
  state.merge({ error });

const ACTION_HANDLERS = {
  // [AppLoginTypes.STARTUP]: startUp,
  [AppStateTypes.SHOW_ALERT_MESSAGE]: showAlertMessage,
  [AppStateTypes.CLEAR_ALERT_MESSAGE]: clearAlertMessage,
  [AppStateTypes.PUSH_NOTIFICATION_TOKEN]: pushNotificationToken,
  [AppStateTypes.PUSH_NOTIFICATION_TOKEN_SUCCESS]: pushNotificationTokenSuccess,
  [AppStateTypes.PUSH_NOTIFICATION_TOKEN_FAILURE]: pushNotificationTokenFailure,
  [AppStateTypes.GET_NOTIFICATION]: getNotification,
  [AppStateTypes.GET_NOTIFICATION_SUCCESS]: getNotificationSuccess,
  [AppStateTypes.GET_NOTIFICATION_FAILURE]: getNotificationFailure
};

export default makeReducerCreator(INITIAL_STATE, ACTION_HANDLERS);
