import Immutable from 'seamless-immutable';
import { OfficeTypeTypes } from './actions';
// import { LoginTypes as AppLoginTypes } from '../AppRedux/actions';
import { makeReducerCreator } from '../../utils/reduxUtils';

export const INITIAL_STATE = Immutable({
  officeTypesData: [],
  error: null,
  loading: null
});

const getOfficeTypes = state =>
  state.merge({
    // remove in live
    error: null,
    loading: true
  });

const getOfficeTypesSuccess = (state, { response }) =>
  state.merge({
    loading: false,
    officeTypesData: response
  });

const getOfficeTypesFailure = (state, { error }) =>
  state.merge({
    error
  });

const ACTION_HANDLERS = {
  // [AppLoginTypes.STARTUP]: startUp,
  [OfficeTypeTypes.GET_OFFICE_TYPES]: getOfficeTypes,
  [OfficeTypeTypes.GET_OFFICE_TYPES_SUCCESS]: getOfficeTypesSuccess,
  [OfficeTypeTypes.GET_OFFICE_TYPES_FAILURE]: getOfficeTypesFailure
};

export default makeReducerCreator(INITIAL_STATE, ACTION_HANDLERS);
