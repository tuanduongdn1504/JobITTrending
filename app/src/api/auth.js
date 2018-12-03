import firebase from 'react-native-firebase';
import { post, get, patch } from './utils';

export async function register(data) {
  return post('/auth/register', data);
}

export async function login(data) {
  return post('/auth/login', data);
}

export async function loginFacebook(data) {
  return post('/auth/facebook', { access_token: data });
}

export async function logout() {
  return post('/auth/logout');
}

export async function forgotPassword(data) {
  return post('/users/password/forgot', data);
}

export async function newPassword(data) {
  return post('/users/password/new', data);
}

export async function updatePassword(data) {
  return post('/users/password/change', data);
}

export async function verifyPasswordToken(data) {
  return post('/users/password/verify', data);
}

export async function getInfo() {
  return get('/users/me');
}

export async function editUser(data) {
  return patch('/users/me', data);
}

export async function becomeTutor(data) {
  return post('/tutors', data);
}

export async function signInWithEmailAndPassword(email, password) {
  const auth = firebase.auth();
  return await auth.signInWithEmailAndPassword(email, password);
}

export async function createUserWithEmailAndPassword(email, password) {
  const auth = firebase.auth();
  return await auth.createUserWithEmailAndPassword(email, password);
}

export async function getCurrentUser() {
  const auth = firebase.auth();
  return await auth.currentUser;
}

export async function signOutFirebase() {
  const auth = firebase.auth();
  await auth.signOut();
}

export async function pushNotiToken(token) {
  return post('/notifications/token', token);
}

export async function getNotification() {
  return get('/notifications');
}
