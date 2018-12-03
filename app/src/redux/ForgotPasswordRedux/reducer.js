import Immutable from 'seamless-immutable';
import { Types } from './actions';
import { makeReducerCreator } from '../../utils/reduxUtils';

export const INITIAL_STATE = Immutable({
  data: {},
  error: null,
  loading: null,
  resetEmail: null,
  verifyToken: null,
});
// TODO: Forgot password
const forgotPassword = (state, { data }) => {
  return state.merge({
    resetEmail: data.email,
  });
};

const forgotPasswordSuccess = state => state.merge({});

const forgotPasswordFailure = state => state.merge({});

// TODO: Verify password
const verifyPassword = (state, { data }) => state.merge({
  verifyToken: data.verify_token,
});

const verifyPasswordSuccess = state => state.merge({});

const verifyPasswordFailure = state => state.merge({
  verifyToken: null,
});

// TODO: Reset password
const resetPassword = (state) => {
  return state.merge({});
};

const resetPasswordSuccess = state => state.merge({
  resetEmail: null,
  verifyToken: null,
});

const resetPasswordFailure = state => state.merge({});

const ACTION_HANDLERS = {
  [Types.FORGOT_PASSWORD]: forgotPassword,
  [Types.FORGOT_PASSWORD_SUCCESS]: forgotPasswordSuccess,
  [Types.FORGOT_PASSWORD_FAILURE]: forgotPasswordFailure,

  [Types.VERIFY_PASSWORD]: verifyPassword,
  [Types.VERIFY_PASSWORD_SUCCESS]: verifyPasswordSuccess,
  [Types.VERIFY_PASSWORD_FAILURE]: verifyPasswordFailure,

  [Types.RESET_PASSWORD]: resetPassword,
  [Types.RESET_PASSWORD_SUCCESS]: resetPasswordSuccess,
  [Types.RESET_PASSWORD_FAILURE]: resetPasswordFailure,
};

export default makeReducerCreator(INITIAL_STATE, ACTION_HANDLERS);
