import { call, put, takeLatest, take, race } from 'redux-saga/effects';
import Actions, { ProcedureTypes } from './actions';
import { getProceduresApi, getProceduresByOfficeId } from '../../api/offices';
import {
  startStackScreen,
  showInAppNoti,
  showProgress
} from '../../navigation/navigationActions';
import { apiWrapper } from '../../utils/reduxUtils';

export function* getProceduresSaga() {
  try {
    const response = yield call(getProceduresApi);
    yield put(Actions.getProceduresSuccess(response.results));
  } catch (error) {
    yield put(Actions.getProceduresFailure(error));
  }
}
export function* fetchProceduresByOfficeIdSaga({ data }) {
  try {
    const response = yield call(getProceduresByOfficeId, data);
    yield put(Actions.fetchProceduresByOfficeIdSuccess(response));
  } catch (error) {
    yield put(Actions.fetchProceduresByOfficeIdFailure(error));
  }
}
const procedureSagas = () => [
  takeLatest(ProcedureTypes.GET_PROCEDURES, getProceduresSaga),
  takeLatest(
    ProcedureTypes.FETCH_LIST_PROCEDURES_BY_OFFICE_ID,
    fetchProceduresByOfficeIdSaga
  )
];

export default procedureSagas();
