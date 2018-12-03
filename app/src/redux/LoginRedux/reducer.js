import Immutable from 'seamless-immutable';
import { LoginTypes } from './actions';
// import { LoginTypes as AppLoginTypes } from '../AppRedux/actions';
import { makeReducerCreator } from '../../utils/reduxUtils';

export const INITIAL_STATE = Immutable({
  data: null,
  error: null,
  loading: null,
  isLogged: false,
  isLogin: false,
  token: null
});

const signUp = state =>
  state.merge({
    // remove in live
    error: null,
    isLogin: true,
    loading: true
  });

const signUpSuccess = (state, { data, token }) =>
  state.merge({
    isLogin: true,
    loading: false
  });

const signUpFailure = (state, action) =>
  state.merge({
    isLogged: false,
    isLogin: false,
    error: action.error,
    editing: false,
    loading: null
  });

const signIn = (state, action) =>
  state.merge({
    error: null,
    isLogin: true,
    isLogged: false,
    loading: true,
    token: null,
    data: action.data
  });

const signInSuccess = (state, { response }) =>
  state.merge({
    isLogged: true,
    isLogin: false,
    loading: false,
    token: response.token,
    ...response
  });

const signInFailure = (state, action) =>
  state.merge({
    isLogged: false,
    isLogin: false,
    error: action.error,
    editing: false,
    loading: false
  });

export const signOut = state => state.merge({ ...INITIAL_STATE });

const getUser = state =>
  state.merge({
    error: null,
    isFetching: true
  });

const editUser = (state, action) =>
  state.merge({
    data: { ...state.data, ...action.data },
    error: null,
    isFetching: true
  });

const updateUserSuccess = (state, { data }) =>
  state.merge({
    data: { ...data },
    error: null,
    isFetching: false
  });

const updateUserFailure = (state, action) =>
  state.merge({
    error: action.errorCode,
    isFetching: false
  });

const ACTION_HANDLERS = {
  // [AppLoginTypes.STARTUP]: startUp,
  [LoginTypes.SIGN_OUT]: signOut,
  [LoginTypes.SIGN_UP]: signUp,
  [LoginTypes.SIGN_UP_SUCCESS]: signUpSuccess,
  [LoginTypes.SIGN_UP_FAILURE]: signUpFailure,
  [LoginTypes.SIGN_IN]: signIn,
  [LoginTypes.SIGN_IN_SUCCESS]: signInSuccess,
  [LoginTypes.SIGN_IN_FAILURE]: signInFailure,
  [LoginTypes.GET_USE]: getUser,
  [LoginTypes.EDIT_USER]: editUser,
  [LoginTypes.UPDATE_USER_SUCCESS]: updateUserSuccess,
  [LoginTypes.UPDATE_USER_FAILURE]: updateUserFailure
};

export default makeReducerCreator(INITIAL_STATE, ACTION_HANDLERS);
