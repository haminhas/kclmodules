import { put, call } from 'redux-saga/effects';
import { takeLatest } from 'redux-saga';
import fetch from 'app/fetch';

import {
  getUserIDFail,
  getUserIDSuccess,
  GET_USERID_REQUEST,
} from './actions';

export function* getUserIDWorker() {
  try {
    const userID = yield call(fetch, 'GET', '/user');
    yield put(getUserIDSuccess(userID));
  } catch (error) {
    yield put(getUserIDFail(error));
  }
}

export function* getUserIDWatcher() {
  yield* takeLatest(GET_USERID_REQUEST, getUserIDWorker);
}
