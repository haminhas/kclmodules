import { put, call } from 'redux-saga/effects';
import { takeLatest } from 'redux-saga';
import fetch from 'app/fetch';

import {
  getUserIDFail,
  getUserIDSuccess,
  GET_USERID_REQUEST,
  getModulesSuccess,
  getModulesFail,
} from './actions';

export function* getModulesWorker(userID) {
  try {
    const modules = yield call(fetch, 'POST', '/modules', { userID });
    yield put(getModulesSuccess(modules));
  } catch (error) {
    yield put(getModulesFail(error));
  }
}

export function* getUserIDWorker() {
  try {
    const userID = yield call(fetch, 'GET', '/user');
    yield call(getModulesWorker, userID);
    yield put(getUserIDSuccess(userID));
  } catch (error) {
    yield put(getUserIDFail(error));
  }
}

export function* getUserIDWatcher() {
  yield* takeLatest(GET_USERID_REQUEST, getUserIDWorker);
}
