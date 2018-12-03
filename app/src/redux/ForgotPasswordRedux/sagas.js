import { call, put, takeLatest } from 'redux-saga/effects';
import I18n from 'react-native-i18n';
import { forgotPassword, verifyPasswordToken, newPassword } from '../../api/auth';
import Actions, { Types } from './actions';
import { showModal, startStackScreen, showInAppNoti } from '../../navigation/navigationActions';
import { close, closeAll } from '../../navigation/navigationButtons';
import { apiWrapper } from '../../utils/reduxUtils';

export function* forgotPasswordWorker({ data }) {
  try {
    const response = yield call(apiWrapper, true, forgotPassword, data);
    if (!response || !response.success) {
      yield put(Actions.forgotPasswordFailure(response));
      showInAppNoti('', response?.message || I18n.t('error.somethingWentWrong'), 'error');
      return;
    }
    yield put(Actions.forgotPasswordSuccess());
    // TODO: Show verify code screen
    showModal('verifyPassword', {
      leftButtons: [close()],
    });
  } catch (err) {
    showInAppNoti('', err?.message || I18n.t('error.somethingWentWrong'), 'error');
    yield put(Actions.forgotPasswordFailure(err));
  }
}

export function* verifyPasswordWorker({ data }) {
  try {
    const response = yield call(apiWrapper, true, verifyPasswordToken, data);
    if (!response || !response.success) {
      yield put(Actions.verifyPasswordFailure(response));
      showInAppNoti('', response?.message || I18n.t('error.somethingWentWrong'), 'error');
      return;
    }
    yield put(Actions.verifyPasswordSuccess(response));
    // TODO: Show reset password
    showModal('resetPassword', {
      leftButtons: [closeAll()],
    });
  } catch (err) {
    showInAppNoti('', err?.message || I18n.t('error.somethingWentWrong'), 'error');
    yield put(Actions.verifyPasswordFailure(err));
  }
}

export function* resetPasswordWorker({ data }) {
  try {
    const { password, confirmPassword } = data;
    if (password !== confirmPassword) {
      showInAppNoti('', I18n.t('error.passwordMismatch'), 'error');
      return;
    }
    const response = yield call(apiWrapper, true, newPassword, data);
    if (!response || !response.success) {
      showInAppNoti('', response?.message || I18n.t('error.somethingWentWrong'), 'error');
      yield put(Actions.resetPasswordFailure(response));
      return;
    }
    yield put(Actions.resetPasswordSuccess(response));

    // TODO: Show intro screen
    startStackScreen();
  } catch (err) {
    showInAppNoti('', err?.message || I18n.t('error.resetPassword'), 'error');
    yield put(Actions.resetPasswordFailure(err));
  }
}

const passwordSagas = () => {
  return [
    takeLatest(Types.FORGOT_PASSWORD, forgotPasswordWorker),
    takeLatest(Types.VERIFY_PASSWORD, verifyPasswordWorker),
    takeLatest(Types.RESET_PASSWORD, resetPasswordWorker),
  ];
};

export default passwordSagas();
