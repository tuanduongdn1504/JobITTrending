import { call, put } from 'redux-saga/effects';
import _ from 'lodash';
import { loading, clearLoading } from '../redux/AppRedux/actions';
import { dismissInAppNoti } from '../navigation/navigationActions';

export function makeConstantCreator(...params) {
  const constant = {};
  _.each(params, (param) => {
    constant[param] = param;
  });
  return constant;
}

export const makeActionCreator = (type, params = null) => ({ type, ...params });

export const makeReducerCreator = (initialState = null, handlers = {}) => (
  state = initialState,
  action,
) => {
  if (!action && !action.type) return state;
  const handler = handlers[action.type];
  return (handler && handler(state, action)) || state;
};

export function* apiWrapper(isHaveProgress = false, apiFunc, ...params) {
  try {
    dismissInAppNoti();
    if (isHaveProgress) {
      // showProgress();
      yield put(loading());
    }
    const response = yield call(apiFunc, ...params);
    yield put(clearLoading());
    // showProgress(false);
    return response;
  } catch (error) {
    // showProgress(false);
    yield put(clearLoading());
    return error;
  }
}
