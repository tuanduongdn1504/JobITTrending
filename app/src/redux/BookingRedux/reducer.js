import Immutable from 'seamless-immutable';
import moment from 'moment';
import { BookingTypes } from './actions';
import { LoginTypes } from '../LoginRedux/actions';
import { makeReducerCreator } from '../../utils/reduxUtils';

export const INITIAL_STATE = Immutable({
  bookingData: {},
  bookingDataNow: {},
  bookingIds: [],
  total: null,
  loading: false,
  error: null,
  page: 0,
  guessingTime: null,
  numericalRunning: null,
  currentNumerical: null
});

const getMyBooking = (state, action) =>
  state.merge({
    loading: true
  });

const getMyBookingSuccess = (state, { response }) => {
  const { data, total, ids } = response;
  return state
    .set('bookingData', data)
    .set('bookingIds', ids)
    .merge({
      total,
      loading: false
    });
};

const getMyBookingFailure = (state, { error }) => state.merge({ error });

const bookingNow = (state, { data }) =>
  state.merge({
    error: null,
    loading: true
  });

const bookingNowSuccess = (state, { response }) => {
  const { id } = response;
  return state
    .setIn(['bookingData', id], {
      ...state.bookingData[id],
      ...response
    })
    .merge({
      bookingDataNow: response,
      loading: false,
      error: null
    });
};

const bookingNowFailure = (state, { error }) =>
  state.merge({
    error
  });

const bookingTimer = (state, { data }) =>
  state.merge({ error: null, loading: true });

const bookingTimerSuccess = (state, { response }) => {
  const { id } = response;
  return state
    .setIn(['bookingData', id], {
      ...state.bookingData[id],
      ...response
    })
    .merge({
      bookingDataNow: response,
      loading: false,
      error: null
    });
};

const bookingTimerFailure = (state, { error }) => state.merge({ error });

const bookingSearch = (state, { data }) => state.merge({ loading: true });

const bookingSearchSuccess = (state, { response }) =>
  state.merge({
    guessingTime: moment(response.time).format('HH:mm DD/MM/YYYY'),
    loading: false
  });

const bookingSearchFailure = (state, { error }) => state.merge({ error });

const getNewCurrentBooking = (state, { officeId }) => state.merge({});
const getNewCurrentBookingSuccess = (state, { response }) =>
  state.merge({
    numericalRunning: response.numerical,
    currentNumerical: response
  });
const getNewCurrentBookingFailure = (state, { error }) =>
  state.merge({ error });

const runningBookingNumerical = (state, { officeId }) => state.merge({});
const runningBookingNumericalSuccess = (state, { response }) =>
  state.merge({
    numericalRunning: response
  });
const runningBookingNumericalFailure = (state, { error }) =>
  state.merge({ error });

const signOut = state => state.merge({ ...INITIAL_STATE });

const getCurrentNumerical = state => state.merge({});
const getCurrentNumericalSuccess = (state, { response }) =>
  state.merge({
    currentNumerical: response
  });
const getCurrentNumericalFailure = (state, { error }) =>
  state.merge({
    error
  });

const ACTION_HANDLERS = {
  // [AppLoginTypes.STARTUP]: startUp,
  [BookingTypes.BOOKING_NOW]: bookingNow,
  [BookingTypes.BOOKING_NOW_SUCCESS]: bookingNowSuccess,
  [BookingTypes.BOOKING_NOW_FAILURE]: bookingNowFailure,

  [BookingTypes.BOOKING_TIMER]: bookingTimer,
  [BookingTypes.BOOKING_TIMER_SUCCESS]: bookingTimerSuccess,
  [BookingTypes.BOOKING_TIMER_FAILURE]: bookingTimerFailure,

  [BookingTypes.GET_MY_BOOKING]: getMyBooking,
  [BookingTypes.GET_MY_BOOKING_SUCCESS]: getMyBookingSuccess,
  [BookingTypes.GET_MY_BOOKING_FAILURE]: getMyBookingFailure,

  [BookingTypes.BOOKING_SEARCH]: bookingSearch,
  [BookingTypes.BOOKING_SEARCH_SUCCESS]: bookingSearchSuccess,
  [BookingTypes.BOOKING_SEARCH_FAILURE]: bookingSearchFailure,

  [BookingTypes.GET_NEW_CURRENT_BOOKING]: getNewCurrentBooking,
  [BookingTypes.GET_NEW_CURRENT_BOOKING_SUCCESS]: getNewCurrentBookingSuccess,
  [BookingTypes.GET_NEW_CURRENT_BOOKING_FAILURE]: getNewCurrentBookingFailure,

  [BookingTypes.RUNNING_BOOKING_NUMERICAL]: runningBookingNumerical,
  [BookingTypes.RUNNING_BOOKING_NUMERICAL_SUCCESS]: runningBookingNumericalSuccess,
  [BookingTypes.RUNNING_BOOKING_NUMERICAL_FAILURE]: runningBookingNumericalFailure,

  [BookingTypes.GET_CURRENT_NUMERICAL]: getCurrentNumerical,
  [BookingTypes.GET_CURRENT_NUMERICAL_SUCCESS]: getCurrentNumericalSuccess,
  [BookingTypes.GET_CURRENT_NUMERICAL_FAILURE]: getCurrentNumericalFailure,

  [LoginTypes.SIGN_OUT]: signOut
};

export default makeReducerCreator(INITIAL_STATE, ACTION_HANDLERS);
