import Immutable from 'seamless-immutable';
import { ProcedureTypes } from './actions';
import { makeReducerCreator } from '../../utils/reduxUtils';

export const INITIAL_STATE = Immutable({
  procedureData: [],
  error: null,
  loading: null
});

const getProcedures = state =>
  state.merge({
    // remove in live
    error: null,
    loading: true
  });

const getProceduresSuccess = (state, { response }) =>
  state.merge({
    loading: false,
    proceduresData: response
  });

const getProceduresFailure = (state, { error }) =>
  state.merge({
    error
  });
const fetchProceduresByOfficeId = (state, { data }) =>
  state.merge({
    error: null,
    loading: true
  });

const fetchProceduresByOfficeIdSuccess = (state, { response }) => {
  const { id } = response;
  return (
    state
      // .setIn(['bookingData', id], {
      //   ...state.bookingData[id],
      //   ...response
      // })
      .merge({
        proceduresData: response,
        loading: false,
        error: null
      })
  );
};

const fetchProceduresByOfficeIdFailure = (state, { error }) =>
  state.merge({
    error
  });

const ACTION_HANDLERS = {
  // [AppLoginTypes.STARTUP]: startUp,
  [ProcedureTypes.GET_PROCEDURES]: getProcedures,
  [ProcedureTypes.GET_PROCEDURES_SUCCESS]: getProceduresSuccess,
  [ProcedureTypes.GET_PROCEDURES_FAILURE]: getProceduresFailure,
  [ProcedureTypes.FETCH_LIST_PROCEDURES_BY_OFFICE_ID]: fetchProceduresByOfficeId,
  [ProcedureTypes.FETCH_LIST_PROCEDURES_BY_OFFICE_ID_SUCCESS]: fetchProceduresByOfficeIdSuccess,
  [ProcedureTypes.FETCH_LIST_PROCEDURES_BY_OFFICE_ID_FAILURE]: fetchProceduresByOfficeIdFailure
};

export default makeReducerCreator(INITIAL_STATE, ACTION_HANDLERS);
