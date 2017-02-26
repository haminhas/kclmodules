import { put, call } from 'redux-saga/effects';
import { takeLatest } from 'redux-saga';
import fetch from 'app/fetch';

import {
  CHECK_CLASH_REQUEST,
  checkClashFail,
  clashSuccess,
  clashFail,
} from './actions';

export function* checkClashWorker({ data }) {
  try {
    const { newModule, oldModule } = data;
    const oldModules = oldModule.map((x) => x.code);
    const newModules = newModule.map((x) => x.code);
    const response = yield call(fetch, 'POST', '/checkClash', { oldModules, newModules });
    if (response[0]) {
      yield put(clashSuccess(response));
    } else {
      yield put(clashFail(response));
    }
  } catch (error) {
    yield put(checkClashFail(error));
  }
}

export function* checkClashWatcher() {
  yield* takeLatest(CHECK_CLASH_REQUEST, checkClashWorker);
}
