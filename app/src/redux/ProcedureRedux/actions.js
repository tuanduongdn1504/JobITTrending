import { makeActionCreator, makeConstantCreator } from '../../utils/reduxUtils';

export const ProcedureTypes = makeConstantCreator(
  'GET_PROCEDURES',
  'GET_PROCEDURES_SUCCESS',
  'GET_PROCEDURES_FAILURE',
  'FETCH_LIST_PROCEDURES_BY_OFFICE_ID',
  'FETCH_LIST_PROCEDURES_BY_OFFICE_ID_SUCCESS',
  'FETCH_LIST_PROCEDURES_BY_OFFICE_ID_FAILURE'
);

const getProcedures = () => makeActionCreator(ProcedureTypes.GET_PROCEDURES);
const getProceduresSuccess = response =>
  makeActionCreator(ProcedureTypes.GET_PROCEDURES_SUCCESS, { response });
const getProceduresFailure = error =>
  makeActionCreator(ProcedureTypes.GET_PROCEDURES_FAILURE, { error });
const fetchProceduresByOfficeId = data =>
  makeActionCreator(ProcedureTypes.FETCH_LIST_PROCEDURES_BY_OFFICE_ID, {
    data
  });
const fetchProceduresByOfficeIdSuccess = response =>
  makeActionCreator(ProcedureTypes.FETCH_LIST_PROCEDURES_BY_OFFICE_ID_SUCCESS, {
    response
  });
const fetchProceduresByOfficeIdFailure = error =>
  makeActionCreator(ProcedureTypes.FETCH_LIST_PROCEDURES_BY_OFFICE_ID_FAILURE, {
    error
  });
export default {
  getProcedures,
  getProceduresSuccess,
  getProceduresFailure,
  fetchProceduresByOfficeId,
  fetchProceduresByOfficeIdSuccess,
  fetchProceduresByOfficeIdFailure
};
