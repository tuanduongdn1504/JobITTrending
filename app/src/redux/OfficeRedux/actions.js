import { makeActionCreator, makeConstantCreator } from '../../utils/reduxUtils';

export const OfficeTypes = makeConstantCreator(
  'GET_OFFICES',
  'GET_OFFICES_SUCCESS',
  'GET_OFFICES_FAILURE',
  'FETCH_LIST_OFFICES_BY_OFFICE_TYPE_ID',
  'FETCH_LIST_OFFICES_BY_OFFICE_TYPE_ID_SUCCESS',
  'FETCH_LIST_OFFICES_BY_OFFICE_TYPE_ID_FAILURE'
);

const getOffices = () => makeActionCreator(OfficeTypes.GET_OFFICES);
const getOfficesSuccess = response =>
  makeActionCreator(OfficeTypes.GET_OFFICES_SUCCESS, { response });
const getOfficesFailure = error =>
  makeActionCreator(OfficeTypes.GET_OFFICES_FAILURE, { error });

const fetchOfficesByOfficeTypeId = data =>
  makeActionCreator(OfficeTypes.FETCH_LIST_OFFICES_BY_OFFICE_TYPE_ID, { data });
const fetchOfficesByOfficeTypeIdSuccess = response =>
  makeActionCreator(OfficeTypes.FETCH_LIST_OFFICES_BY_OFFICE_TYPE_ID_SUCCESS, {
    response
  });
const fetchOfficesByOfficeTypeIdFailure = error =>
  makeActionCreator(OfficeTypes.FETCH_LIST_OFFICES_BY_OFFICE_TYPE_ID_FAILURE, {
    error
  });

export default {
  getOffices,
  getOfficesSuccess,
  getOfficesFailure,
  fetchOfficesByOfficeTypeId,
  fetchOfficesByOfficeTypeIdSuccess,
  fetchOfficesByOfficeTypeIdFailure
};
