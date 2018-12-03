import { call, put, takeLatest, take, race } from 'redux-saga/effects';
import I18n from 'react-native-i18n';
import Actions, { AppStateTypes } from './actions';
import AppActions from '../AppRedux/actions';
import { pushNotiToken, getNotification } from '../../api/auth';
import AppStateActions from '../AppStateRedux/actions';

export function* pushNotiTokenSaga({ token }) {
  try {
    const response = yield call(pushNotiToken, token);
    yield put(Actions.pushNotificationTokenSuccess(response));
  } catch (error) {
    console.log('error noti', error);
  }
}

export function* getNotificationSaga() {
  try {
    const response = yield call(getNotification);

    yield put(Actions.getNotificationSuccess(response.results));
  } catch (error) {
    yield put(Actions.getNotificationFailure(error));
  }
}
const appStateSagas = () => [
  takeLatest(AppStateTypes.PUSH_NOTIFICATION_TOKEN, pushNotiTokenSaga),
  takeLatest(AppStateTypes.GET_NOTIFICATION, getNotificationSaga)
];

export default appStateSagas();
