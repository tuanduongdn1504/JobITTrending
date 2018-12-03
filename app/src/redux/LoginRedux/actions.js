import { makeActionCreator, makeConstantCreator } from '../../utils/reduxUtils';

export const LoginTypes = makeConstantCreator(
  'SIGN_IN',
  'SIGN_IN_SUCCESS',
  'SIGN_IN_FAILURE',

  'SIGN_UP',
  'SIGN_UP_SUCCESS',
  'SIGN_UP_FAILURE',

  'SIGN_OUT',
  'CHANGE_PASSWORD',
  'GET_USE',
  'EDIT_USER',
  'UPDATE_USER_SUCCESS',
  'UPDATE_USER_FAILURE'
);

const signOut = () => makeActionCreator(LoginTypes.SIGN_OUT);
const signIn = data => makeActionCreator(LoginTypes.SIGN_IN, { data });
const signInSuccess = (response, role) =>
  makeActionCreator(LoginTypes.SIGN_IN_SUCCESS, { response, role });
const signInFailure = error =>
  makeActionCreator(LoginTypes.SIGN_IN_FAILURE, { error });

const signUp = data => makeActionCreator(LoginTypes.SIGN_UP, { data });
const signUpSuccess = response =>
  makeActionCreator(LoginTypes.SIGN_UP_SUCCESS, { response });
const signUpFailure = error =>
  makeActionCreator(LoginTypes.SIGN_UP_FAILURE, { error });

const getUser = data => makeActionCreator(LoginTypes.GET_USE, { data });
const editUser = data => makeActionCreator(LoginTypes.EDIT_USER, { data });
const updateUserSuccess = data =>
  makeActionCreator(LoginTypes.UPDATE_USER_SUCCESS, { data });
const updateUserFailure = errorCode =>
  makeActionCreator(LoginTypes.UPDATE_USER_FAILURE, { errorCode });

const changePassword = data =>
  makeActionCreator(LoginTypes.CHANGE_PASSWORD, { data });

export default {
  signIn,
  signInSuccess,
  signInFailure,

  signUp,
  signUpSuccess,
  signUpFailure,

  getUser,
  changePassword,
  editUser,
  updateUserFailure,
  updateUserSuccess,
  signOut
};
