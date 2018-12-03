import { call, put, takeLatest, take, race } from 'redux-saga/effects';
import Actions, { OfficeTypeTypes } from './actions';
import { getOfficeTypesApi } from '../../api/offices';
import {
  startStackScreen,
  showInAppNoti,
  showProgress
} from '../../navigation/navigationActions';
import { apiWrapper } from '../../utils/reduxUtils';

export function* getOfficeTypesSaga() {
  try {
    const response = yield call(getOfficeTypesApi);
    yield put(Actions.getOfficeTypesSuccess(response.results));
  } catch (error) {
    yield put(Actions.getOfficeTypesFailure(error));
  }
}
const officeTypeSagas = () => [
  takeLatest(OfficeTypeTypes.GET_OFFICE_TYPES, getOfficeTypesSaga)
];

export default officeTypeSagas();
