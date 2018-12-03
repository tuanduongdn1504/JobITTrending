import Immutable from 'seamless-immutable';
import { FilterTypes } from './actions';
import { makeReducerCreator } from '../../utils/reduxUtils';

export const INITIAL_STATE = Immutable({
  data: {},
});

const setFilter = (state, { data }) => {
  return state.merge({
    data: { ...state.data, ...data },
  });
};

const ACTION_HANDLERS = {
  [FilterTypes.SET_FILTER]: setFilter,
};

export default makeReducerCreator(INITIAL_STATE, ACTION_HANDLERS);
