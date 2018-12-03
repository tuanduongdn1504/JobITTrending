import { call, put, takeLatest, take, race, select } from 'redux-saga/effects';
import { eventChannel } from 'redux-saga';
import firebase from 'react-native-firebase';
import _ from 'lodash';
import Actions, { BookingTypes } from './actions';
import {
  bookingNow,
  bookingTimer,
  getMyBooking,
  bookingSearch,
  runningBookingNumerical,
  getCurrentBooking
} from '../../api/booking';
import { showInAppNoti } from '../../navigation/navigationActions';
import { apiWrapper } from '../../utils/reduxUtils';
import AppStateActions from '../AppStateRedux/actions';

const createBookingChanel = () =>
  eventChannel(emit => {
    const firebaseStore = firebase.firestore();
    const hander = firebaseStore.collection('bookings').onSnapshot(snapshot => {
      snapshot.docChanges.forEach(change => {
        if (change.type === 'added') {
          emit({
            type: 'added',
            data: { ...change.doc.data(), id: Number(change.doc.id) }
          });
        }
        if (change.type === 'modified') {
          emit({
            type: 'modified',
            data: { ...change.doc.data(), id: Number(change.doc.id) }
          });
        }
        if (change.type === 'removed') {
          emit({
            type: 'removed',
            data: { ...change.doc.data(), id: Number(change.doc.id) }
          });
        }
      });
    });
    return () => {
      hander.off();
    };
  });

export function* bookingNowSaga({ data }) {
  try {
    const response = yield call(apiWrapper, true, bookingNow, data);
    yield put(Actions.bookingNowSuccess(response));
    showInAppNoti('SỐ THỨ TỰ CỦA BẠN:', `${response.numerical}`, 'success');
  } catch (error) {
    console.log('errror', error);
  }
}

export function* bookingTimerSaga({ data }) {
  try {
    const response = yield call(apiWrapper, true, bookingTimer, data);
    yield put(Actions.bookingTimerSuccess(response));
    showInAppNoti('SỐ THỨ TỰ CỦA BẠN:', `${response.numerical}`, 'success');
  } catch (error) {
    console.log('hihi', error);
  }
}

export function* getMyBookingSaga({ isNextPage }) {
  try {
    let page = yield select(store => store.booking.page);
    if (isNextPage) {
      page += 1;
    }
    const response = yield call(getMyBooking, page);

    const payload = {
      data: _.keyBy(response.results, 'id'),
      ids: _.map(response.results, 'id')
    };

    payload.total = response.total;
    yield put(Actions.getMyBookingSuccess(payload));
  } catch (error) {
    yield put(Actions.getMyBookingFailure(error));
  }
}

export function* bookingSearchSaga({ data }) {
  try {
    const response = yield call(bookingSearch, data);
    if (!response || (response.data && response.data.officeId)) {
      showInAppNoti(
        'HỆ THỐNG KHÔNG TÌM THẤY DỮ LIỆU',
        `Đi lấy số ngay nào!`,
        'error'
      );
      yield put(Actions.bookingSearchFailure(response));
      return;
    }
    yield put(Actions.bookingSearchSuccess(response));
    if (response.numericalRunning !== 0) {
      showInAppNoti(
        'SỐ THỨ TỰ HIỆN TẠI:',
        `${response.numericalRunning}`,
        'success'
      );
    } else {
      showInAppNoti(
        'HỆ THỐNG HIỆN TẠI KHÔNG LÀM VIỆC',
        'Vui lòng quay lại sau!',
        'success'
      );
    }
  } catch (error) {
    yield put(Actions.bookingSearchFailure(error));
    showInAppNoti(
      'HỆ THỐNG KHÔNG TÌM THẤY DỮ LIỆU',
      `Đi lấy số ngay nào!`,
      'error'
    );
  }
}

export function* runningBookingNumericalSaga({ officeId }) {
  try {
    const response = yield call(runningBookingNumerical, officeId);
    yield put(Actions.runningBookingNumericalSuccess(response));
  } catch (error) {
    yield put(Actions.runningBookingNumericalFailure(error));
  }
}

export function* getNewCurrentBookingSaga({ officeId }) {
  try {
    const snapshot = yield call(createBookingChanel);
    while (true) {
      const payload = yield take(snapshot);

      const id = payload.data.officeId;

      if (id === officeId) {
        if (payload.type === 'modified') {
          if (payload.data.status === 'running') {
            yield put(Actions.getNewCurrentBookingSuccess(payload.data));
          }
        }
        if (payload.type === 'added') {
          if (payload.data.status === 'running') {
            yield put(Actions.getNewCurrentBookingSuccess(payload.data));
          }
        }
      }
    }
  } catch (error) {
    console.log(error);
  }
}

export function* getCurrentNumericalSaga() {
  try {
    const response = yield call(getCurrentBooking);
    yield put(Actions.getCurrentNumericalSuccess(response));
  } catch (error) {
    yield put(Actions.getCurrentNumericalFailure(error));
  }
}
const bookingSagas = () => [
  // takeLatest(LoginTypes.SIGN_UP, signUp),
  takeLatest(BookingTypes.BOOKING_NOW, bookingNowSaga),
  takeLatest(BookingTypes.BOOKING_TIMER, bookingTimerSaga),
  takeLatest(BookingTypes.GET_MY_BOOKING, getMyBookingSaga),
  takeLatest(BookingTypes.BOOKING_SEARCH, bookingSearchSaga),
  takeLatest(BookingTypes.GET_NEW_CURRENT_BOOKING, getNewCurrentBookingSaga),
  takeLatest(
    BookingTypes.RUNNING_BOOKING_NUMERICAL,
    runningBookingNumericalSaga
  ),
  takeLatest(BookingTypes.GET_CURRENT_NUMERICAL, getCurrentNumericalSaga)
];

export default bookingSagas();
