import { put, call } from 'redux-saga/effects';
import { takeLatest } from 'redux-saga';
import fetch from 'app/fetch';

import {
  getUserIDFail,
  getUserIDSuccess,
  GET_USERID_REQUEST,
  getModulesSuccess,
  getModulesFail,
  CHECK_CLASH_REQUEST,
  checkClashSuccess,
  checkClashFail,
  getModuleTimetableSuccess,
  getModuleTimetableFail,
} from './actions';

export function* getModulesWorker(userID) {
  try {
    const modules = yield call(fetch, 'POST', '/modules', { userID });
    yield call(getModuleTimetableWorker, modules);
    yield put(getModulesSuccess(modules));
  } catch (error) {
    yield put(getModulesFail(error));
  }
}

const getKey = (arr) => {
  const newArr = [];
  for (const key in arr) {
    newArr.push(key);
  }
  return newArr;
};

export function* checkClashWorker({ data }) {
  try {
    let { oldModules, newModules } = data;
    oldModules = getKey(oldModules);
    newModules = getKey(newModules);
    const studentid = yield call(fetch, 'GET', '/user');
    const response = yield call(fetch, 'POST', '/checkClash', {studentid, oldModules, newModules});
    yield put(checkClashSuccess(response));
  } catch (error) {
    yield put(checkClashFail(error));
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

export function* getModuleTimetableWorker(moduleCodes) {
  try {
    const modules = yield call(fetch, 'POST', '/moduleTimetables', { moduleCodes });
    yield put(getModuleTimetableSuccess(modules));
  } catch (error) {
    yield put(getModuleTimetableFail(error));
  }
}

export function* getUserIDWatcher() {
  yield* takeLatest(GET_USERID_REQUEST, getUserIDWorker);
}

export function* checkClashWatcher() {
  yield* takeLatest(CHECK_CLASH_REQUEST, checkClashWorker);
}
