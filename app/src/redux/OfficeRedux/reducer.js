import Immutable from 'seamless-immutable';
import { OfficeTypes } from './actions';
// import { LoginTypes as AppLoginTypes } from '../AppRedux/actions';
import { makeReducerCreator } from '../../utils/reduxUtils';

export const INITIAL_STATE = Immutable({
  officeData: [],
  error: null,
  loading: null
});

const getOffices = state =>
  state.merge({
    // remove in live
    error: null,
    loading: true
  });

const getOfficesSuccess = (state, { response }) =>
  state.merge({
    loading: false,
    officesData: response
  });

const getOfficesFailure = (state, { error }) =>
  state.merge({
    error
  });
const fetchOfficesByOfficeTypeId = (state, { data }) =>
  state.merge({
    error: null,
    loading: true
  });

const fetchOfficesByOfficeTypeIdSuccess = (state, { response }) => {
  const { id } = response;
  return (
    state
      // .setIn(['bookingData', id], {
      //   ...state.bookingData[id],
      //   ...response
      // })
      .merge({
        officesData: response,
        loading: false,
        error: null
      })
  );
};

const fetchOfficesByOfficeTypeIdFailure = (state, { error }) =>
  state.merge({
    error
  });

const ACTION_HANDLERS = {
  // [AppLoginTypes.STARTUP]: startUp,
  [OfficeTypes.FETCH_LIST_OFFICES_BY_OFFICE_TYPE_ID]: fetchOfficesByOfficeTypeId,
  [OfficeTypes.FETCH_LIST_OFFICES_BY_OFFICE_TYPE_ID_SUCCESS]: fetchOfficesByOfficeTypeIdSuccess,
  [OfficeTypes.FETCH_LIST_OFFICES_BY_OFFICE_TYPE_ID_FAILURE]: fetchOfficesByOfficeTypeIdFailure,
  [OfficeTypes.GET_OFFICES]: getOffices,
  [OfficeTypes.GET_OFFICES_SUCCESS]: getOfficesSuccess,
  [OfficeTypes.GET_OFFICES_FAILURE]: getOfficesFailure
};

export default makeReducerCreator(INITIAL_STATE, ACTION_HANDLERS);
