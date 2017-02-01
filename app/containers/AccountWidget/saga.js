import { put } from 'redux-saga/effects';
import { takeLatest } from 'redux-saga';

import {
  LOGIN_REQUEST,
  loginSuccess,
  loginFail,
  LOGOUT_REQUEST,
  logoutSuccess,
  logoutFail
} from './actions';


export function* loginWorker() {
  try {
    yield put(loginSuccess());
  } catch (error) {
    yield put(loginFail(error));
  }
}

export function* logoutWorker() {
  try {
    yield put(logoutSuccess());
  } catch (error) {
    yield put(logoutFail(error));
  }
}

export function* loginWatcher() {
  yield* takeLatest(LOGIN_REQUEST, loginWorker);
}

export function* logoutWatcher() {
  yield* takeLatest(LOGOUT_REQUEST, logoutWorker);
}
