import { makeActionCreator, makeConstantCreator } from '../../utils/reduxUtils';

export const Types = makeConstantCreator(
  'FORGOT_PASSWORD',
  'FORGOT_PASSWORD_SUCCESS',
  'FORGOT_PASSWORD_FAILURE',

  'VERIFY_PASSWORD',
  'VERIFY_PASSWORD_SUCCESS',
  'VERIFY_PASSWORD_FAILURE',

  'RESET_PASSWORD',
  'RESET_PASSWORD_SUCCESS',
  'RESET_PASSWORD_FAILURE',
);

const forgotPassword = data => makeActionCreator(Types.FORGOT_PASSWORD, { data });
const forgotPasswordSuccess = response => makeActionCreator(Types.FORGOT_PASSWORD_SUCCESS, { response });
const forgotPasswordFailure = error => makeActionCreator(Types.FORGOT_PASSWORD_FAILURE, { error });

const verifyPassword = data => makeActionCreator(Types.VERIFY_PASSWORD, { data });
const verifyPasswordSuccess = response => makeActionCreator(Types.VERIFY_PASSWORD_SUCCESS, { response });
const verifyPasswordFailure = error => makeActionCreator(Types.VERIFY_PASSWORD_FAILURE, { error });

const resetPassword = data => makeActionCreator(Types.RESET_PASSWORD, { data });
const resetPasswordSuccess = response => makeActionCreator(Types.RESET_PASSWORD_SUCCESS, { response });
const resetPasswordFailure = error => makeActionCreator(Types.RESET_PASSWORD_FAILURE, { error });

export default {
  forgotPassword,
  forgotPasswordSuccess,
  forgotPasswordFailure,

  verifyPassword,
  verifyPasswordSuccess,
  verifyPasswordFailure,

  resetPassword,
  resetPasswordSuccess,
  resetPasswordFailure,
};
