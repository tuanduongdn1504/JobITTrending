import { makeActionCreator, makeConstantCreator } from '../../utils/reduxUtils';

export const OfficeTypeTypes = makeConstantCreator(
  'GET_OFFICE_TYPES',
  'GET_OFFICE_TYPES_SUCCESS',
  'GET_OFFICE_TYPES_FAILURE'
);

const getOfficeTypes = () =>
  makeActionCreator(OfficeTypeTypes.GET_OFFICE_TYPES);
const getOfficeTypesSuccess = response =>
  makeActionCreator(OfficeTypeTypes.GET_OFFICE_TYPES_SUCCESS, { response });
const getOfficeTypesFailure = error =>
  makeActionCreator(OfficeTypeTypes.GET_OFFICE_TYPES_FAILURE, { error });

export default {
  getOfficeTypes,
  getOfficeTypesSuccess,
  getOfficeTypesFailure
};
