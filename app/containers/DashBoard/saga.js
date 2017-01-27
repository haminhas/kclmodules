import { put, call } from 'redux-saga/effects';
import { takeLatest } from 'redux-saga';
import fetch from 'app/fetch';

import {
  getUserIDFail,
  getUserIDSuccess,
  GET_USERID_REQUEST,
  getUserModulesSuccess,
  getUserModulesFail,
} from './actions';

export function* getUserModulesWorker(userID) {
  try {
    const userModules = yield call(fetch, 'POST', '/userModules', { userID });
    yield put(getUserModulesSuccess(userModules));
  } catch (error) {
    yield put(getUserModulesFail(error));
  }
}

export function* getUserIDWorker() {
  try {
    const userID = yield call(fetch, 'GET', '/user');
    yield call(getUserModulesWorker, userID);
    yield put(getUserIDSuccess(userID));
  } catch (error) {
    yield put(getUserIDFail(error));
  }
}

export function* getUserIDWatcher() {
  yield* takeLatest(GET_USERID_REQUEST, getUserIDWorker);
}
