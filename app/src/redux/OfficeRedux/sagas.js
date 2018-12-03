import { call, put, takeLatest, take, race } from 'redux-saga/effects';
import Actions, { OfficeTypes } from './actions';
import { getOfficesApi, getOfficesByOfficeTypeId } from '../../api/offices';
import {
  startStackScreen,
  showInAppNoti,
  showProgress
} from '../../navigation/navigationActions';
import { apiWrapper } from '../../utils/reduxUtils';

export function* getOfficesSaga() {
  try {
    const response = yield call(getOfficesApi);
    yield put(Actions.getOfficesSuccess(response.results));
  } catch (error) {
    yield put(Actions.getOfficesFailure(error));
  }
}
export function* fetchOfficesByOfficeTypeIdSaga({ data }) {
  try {
    const response = yield call(getOfficesByOfficeTypeId, data);
    yield put(Actions.fetchOfficesByOfficeTypeIdSuccess(response));
  } catch (error) {
    yield put(Actions.fetchOfficesByOfficeTypeIdFailure(error));
  }
}
const officeSagas = () => [
  takeLatest(OfficeTypes.GET_OFFICES, getOfficesSaga),
  takeLatest(
    OfficeTypes.FETCH_LIST_OFFICES_BY_OFFICE_TYPE_ID,
    fetchOfficesByOfficeTypeIdSaga
  )
];

export default officeSagas();
