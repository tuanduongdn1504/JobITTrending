import { makeActionCreator, makeConstantCreator } from '../../utils/reduxUtils';

export const BookingTypes = makeConstantCreator(
  'BOOKING_NOW',
  'BOOKING_NOW_SUCCESS',
  'BOOKING_NOW_FAILURE',

  'BOOKING_TIMER',
  'BOOKING_TIMER_SUCCESS',
  'BOOKING_TIMER_FAILURE',

  'GET_MY_BOOKING',
  'GET_MY_BOOKING_SUCCESS',
  'GET_MY_BOOKING_FAILURE',

  'BOOKING_SEARCH',
  'BOOKING_SEARCH_SUCCESS',
  'BOOKING_SEARCH_FAILURE',

  'GET_NEW_CURRENT_BOOKING',
  'GET_NEW_CURRENT_BOOKING_SUCCESS',
  'GET_NEW_CURRENT_BOOKING_FAILURE',

  'RUNNING_BOOKING_NUMERICAL',
  'RUNNING_BOOKING_NUMERICAL_SUCCESS',
  'RUNNING_BOOKING_NUMERICAL_FAILURE',

  'GET_CURRENT_NUMERICAL',
  'GET_CURRENT_NUMERICAL_SUCCESS',
  'GET_CURRENT_NUMERICAL_FAILURE'
);

const getMyBooking = (isNextPage = false) =>
  makeActionCreator(BookingTypes.GET_MY_BOOKING, { isNextPage });
const getMyBookingSuccess = response =>
  makeActionCreator(BookingTypes.GET_MY_BOOKING_SUCCESS, { response });
const getMyBookingFailure = error =>
  makeActionCreator(BookingTypes.GET_MY_BOOKING_FAILURE, { error });

const bookingNow = data =>
  makeActionCreator(BookingTypes.BOOKING_NOW, { data });
const bookingNowSuccess = response =>
  makeActionCreator(BookingTypes.BOOKING_NOW_SUCCESS, { response });
const bookingNowFailure = error =>
  makeActionCreator(BookingTypes.BOOKING_NOW_FAILURE, { error });

const bookingTimer = data =>
  makeActionCreator(BookingTypes.BOOKING_TIMER, { data });
const bookingTimerSuccess = response =>
  makeActionCreator(BookingTypes.BOOKING_TIMER_SUCCESS, { response });
const bookingTimerFailure = error =>
  makeActionCreator(BookingTypes.BOOKING_TIMER_FAILURE, { error });

const bookingSearch = data =>
  makeActionCreator(BookingTypes.BOOKING_SEARCH, { data });
const bookingSearchSuccess = response =>
  makeActionCreator(BookingTypes.BOOKING_SEARCH_SUCCESS, { response });
const bookingSearchFailure = error =>
  makeActionCreator(BookingTypes.BOOKING_SEARCH_FAILURE, { error });

const getNewCurrentBooking = officeId =>
  makeActionCreator(BookingTypes.GET_NEW_CURRENT_BOOKING, { officeId });
const getNewCurrentBookingSuccess = response =>
  makeActionCreator(BookingTypes.GET_NEW_CURRENT_BOOKING_SUCCESS, { response });
const getNewCurrentBookingFailure = error =>
  makeActionCreator(BookingTypes.GET_NEW_CURRENT_BOOKING_FAILURE, { error });

const runningBookingNumerical = officeId =>
  makeActionCreator(BookingTypes.RUNNING_BOOKING_NUMERICAL, { officeId });
const runningBookingNumericalSuccess = response =>
  makeActionCreator(BookingTypes.RUNNING_BOOKING_NUMERICAL_SUCCESS, {
    response
  });
const runningBookingNumericalFailure = error =>
  makeActionCreator(BookingTypes.RUNNING_BOOKING_NUMERICAL_FAILURE, { error });

const getCurrentNumerical = () =>
  makeActionCreator(BookingTypes.GET_CURRENT_NUMERICAL);
const getCurrentNumericalSuccess = response =>
  makeActionCreator(BookingTypes.GET_CURRENT_NUMERICAL_SUCCESS, { response });
const getCurrentNumericalFailure = error =>
  makeActionCreator(BookingTypes.GET_CURRENT_NUMERICAL_FAILURE, { error });

export default {
  bookingNow,
  bookingNowSuccess,
  bookingNowFailure,

  bookingTimer,
  bookingTimerSuccess,
  bookingTimerFailure,

  getMyBooking,
  getMyBookingSuccess,
  getMyBookingFailure,

  bookingSearch,
  bookingSearchSuccess,
  bookingSearchFailure,

  getNewCurrentBooking,
  getNewCurrentBookingSuccess,
  getNewCurrentBookingFailure,

  runningBookingNumerical,
  runningBookingNumericalSuccess,
  runningBookingNumericalFailure,

  getCurrentNumerical,
  getCurrentNumericalSuccess,
  getCurrentNumericalFailure
};
