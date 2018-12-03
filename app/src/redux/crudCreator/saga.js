import { takeLatest, put, call, fork, select } from 'redux-saga/effects';
import _ from 'lodash';
import { apiWrapper } from '../../utils/reduxUtils';
import {
  getAllApi,
  getDataByIdApi,
  postApi,
  putApi,
  delApi
} from '../../api/crud';
import { makeActionName, upperFirstChar } from '../../utils/textUtils';
import { PRIMARY_KEY, CRUD_ACTIONS } from './actions';
import { showInAppNoti } from '../../navigation/navigationActions';
import { convertResponseData } from './dataProvider';

function* getAllSaga(data, resource, successAction, failureAction) {
  try {
    const { pageSize, page } = yield select(state => state[resource]);
    const convertRequest = {
      limit: pageSize,
      offset: pageSize * (page - 1),
      ...data
    };
    const response = yield call(
      apiWrapper,
      false,
      getAllApi,
      resource,
      convertRequest
    );
    const result = convertResponseData('GET_ALL', response);
    if (result.data) {
      yield put(
        successAction({
          numberOfPages: Math.floor(result.total / pageSize),
          ...result
        })
      );
    } else {
      // showInAppNoti('', response.message, 'error');
      yield put(failureAction(response));
    }
  } catch (error) {
    showInAppNoti('', 'Something wrong!', 'error');
    yield put(failureAction(error));
  }
}

function* getDataByIdSaga(data, resource, successAction, failureAction) {
  try {
    const response = yield call(
      apiWrapper,
      true,
      getDataByIdApi,
      upperFirstChar(resource),
      data[PRIMARY_KEY]
    );
    const result = convertResponseData('GET_BY_ID', response);
    if (result) {
      yield put(successAction(result));
    } else {
      yield put(failureAction(result));
    }
  } catch (error) {
    yield put(failureAction(error));
  }
}

function* editSaga(data, resource, successAction, failureAction, getOne) {
  // delete data.c
  try {
    const response = yield call(
      apiWrapper,
      true,
      putApi,
      upperFirstChar(resource),
      data[PRIMARY_KEY],
      data
    );
    const result = convertResponseData('EDIT', response);
    if (result) {
      yield put(successAction({ ...data, ...result }));
    } else {
      yield put(failureAction({ ...data, ...response }));
    }
  } catch (error) {
    yield put(failureAction(error));
    //
  }
}

function* createSaga(data, resource, successAction, failureAction) {
  try {
    const response = yield call(apiWrapper, true, postApi, resource, data);
    const result = convertResponseData('CREATE', response);
    if (result) {
      yield put(successAction(result));
    } else {
      showInAppNoti('', response.message, 'error');
      yield put(failureAction(response));
    }
  } catch (error) {
    //
    yield put(failureAction(error));
  }
}

function* delSaga(data, resource, successAction, failureAction) {
  try {
    const response = yield call(
      apiWrapper,
      true,
      delApi,
      resource,
      data.path || data[PRIMARY_KEY]
    );
    const result = convertResponseData('DELETE', response);
    if (result) {
      yield put(successAction(result || {}));
    } else {
      yield put(failureAction(response));
    }
  } catch (error) {
    yield put(failureAction(error));
  }
}

const makeCRUDSagaCreator = (resource, actions) => {
  function* getAllSagaCreator({ data }) {
    yield fork(
      getAllSaga,
      data,
      resource,
      actions[
        makeActionName(`GET_ALL_${_.snakeCase(resource).toUpperCase()}_SUCCESS`)
      ],
      actions[
        makeActionName(`GET_ALL_${_.snakeCase(resource).toUpperCase()}_FAILURE`)
      ]
    );
  }
  function* getDataByIdSagaCreator({ data }) {
    yield fork(
      getDataByIdSaga,
      data,
      resource,
      actions[
        makeActionName(
          `GET_BY_ID_${_.snakeCase(resource).toUpperCase()}_SUCCESS`
        )
      ],
      actions[
        makeActionName(
          `GET_BY_ID_${_.snakeCase(resource).toUpperCase()}_FAILURE`
        )
      ]
    );
  }
  function* editSagaCreator({ data }) {
    yield fork(
      editSaga,
      data,
      resource,
      actions[
        makeActionName(`EDIT_${_.snakeCase(resource).toUpperCase()}_SUCCESS`)
      ],
      actions[
        makeActionName(`EDIT_${_.snakeCase(resource).toUpperCase()}_FAILURE`)
      ],
      getDataByIdSaga
    );
  }
  function* deleteSagaCreator({ data }) {
    yield fork(
      delSaga,
      data,
      resource,
      actions[
        makeActionName(`DELETE_${_.snakeCase(resource).toUpperCase()}_SUCCESS`)
      ],
      actions[
        makeActionName(`DELETE_${_.snakeCase(resource).toUpperCase()}_FAILURE`)
      ]
    );
  }
  function* createSagaCreator({ data }) {
    yield fork(
      createSaga,
      data,
      resource,
      actions[
        makeActionName(`CREATE_${_.snakeCase(resource).toUpperCase()}_SUCCESS`)
      ],
      actions[
        makeActionName(`CREATE_${_.snakeCase(resource).toUpperCase()}_FAILURE`)
      ]
    );
  }
  const sagas = {
    GET_ALL: getAllSagaCreator,
    GET_BY_ID: getDataByIdSagaCreator,
    EDIT: editSagaCreator,
    DELETE: deleteSagaCreator,
    CREATE: createSagaCreator
  };
  return sagas;
};

const rootCRUDSaga = (resource, ignoreActions = [], actions) => {
  const sagaCreators = makeCRUDSagaCreator(resource, actions);
  const acceptActions = _.xor(CRUD_ACTIONS, ignoreActions);
  return acceptActions.map(data =>
    takeLatest(
      `${data}_${_.snakeCase(resource).toUpperCase()}`,
      sagaCreators[data]
    )
  );
};

export default rootCRUDSaga;
