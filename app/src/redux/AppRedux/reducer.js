import Immutable from 'seamless-immutable';
import { Types } from './actions';
import { makeReducerCreator } from '../../utils/reduxUtils';

export const INITIAL_STATE = Immutable({
  loading: null,
});
const loading = state => state.merge({
  loading: true,
});

const clearLoading = state => state.merge({
  loading: null,
});
const ACTION_HANDLERS = {
  [Types.LOADING]: loading,
  [Types.CLEAR_LOADING]: clearLoading,
};

export default makeReducerCreator(INITIAL_STATE, ACTION_HANDLERS);
