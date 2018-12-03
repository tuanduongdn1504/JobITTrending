import { post, get, patch } from './utils';

export async function bookingNow(data) {
  return post('/bookings/now', data);
}

export async function bookingTimer(data) {
  return post('/bookings/timer', data);
}

export async function getMyBooking() {
  return get('/bookings/me');
}

export async function bookingSearch(data) {
  return post('/bookings/search', data);
}

export async function runningBookingNumerical(officeId) {
  return post('/bookings/running', officeId);
}

export async function getCurrentBooking() {
  return get('/bookings/currentBooking');
}
