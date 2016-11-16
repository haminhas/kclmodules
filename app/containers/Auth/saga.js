import { call, put } from 'redux-saga/effects';
import fetch from 'app/fetch';
import { takeLatest } from 'redux-saga';
import {
  LOGIN_REQUEST,
  loginFail,
  loginSucceed,
} from './actions';

export function* loginWorker() {
  try {
    yield call(fetch, 'POST', '/auth', {});
    yield put(loginSucceed());
  } catch (error) {
    yield put(loginFail(error));
  }
}

export function* loginWatcher() {
  yield* takeLatest(LOGIN_REQUEST, loginWorker);
}
