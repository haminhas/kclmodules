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
export function* checkClashWorker({ data }) {
  try {
    const {newFormModule, oldFormModule} = data;
    const oldModules = oldFormModule.map((x) => x.moduleCode);
    const newModules = newFormModule.map((x) => x.moduleCode);
    const response = yield call(fetch, 'POST', '/checkClash', {oldModules, newModules});
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
