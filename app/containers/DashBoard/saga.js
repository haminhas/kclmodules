import { put, call } from 'redux-saga/effects';
import { takeLatest } from 'redux-saga';
import fetch from 'app/fetch';

import {
  getUserIDFail,
  getUserIDSuccess,
  GET_USERID_REQUEST,
  getModulesSuccess,
  getModulesFail,
  checkClashSuccess,
  checkClashFail,
  getModuleTimetableSuccess,
  getModuleTimetableFail,
  specSuccess,
  specFail,
} from './actions';

import { loginWorker } from 'app/containers/AccountWidget/saga';


export function* getModulesWorker(userID) {
  try {
    const modules = yield call(fetch, 'POST', '/modules', { userID });
    yield call(getModuleTimetableWorker, modules);
    yield put(getModulesSuccess(modules));
  } catch (error) {
    yield put(getModulesFail(error));
  }
}

export function* specWorker() {
  try {
    const specialisation = yield call(fetch, 'POST', '/specialisation');
    yield put(specSuccess(specialisation));
  } catch (error) {
    yield put(specFail(error));
  }
}

export function* checkClashWorker({ data }) {
  try {
    const {newModule, oldModule} = data;
    const oldModules = oldModule.map((x) => x.code);
    const newModules = newModule.map((x) => x.code);
    const response = yield call(fetch, 'POST', '/checkClash', {oldModules, newModules});
    yield put(checkClashSuccess(response));
  } catch (error) {
    yield put(checkClashFail(error));
  }
}

export function* getUserIDWorker() {
  try {
    const userID = yield call(fetch, 'GET', '/user');
    yield call(loginWorker);
    yield call(getModulesWorker, userID);
    yield call(specWorker);
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
