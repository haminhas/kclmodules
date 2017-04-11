import { put, call } from 'redux-saga/effects';
import { takeLatest } from 'redux-saga';
import fetch from 'app/fetch';

import {
  PROGRAMMES_REQUEST,
  programmesSuccess,
  programmesFail,
  PROGRAMMES_ON_CHANGE,
  dataSuccess,
  dataFail,
} from './actions';

export function* getProgrammesWorker() {
  try {
    const programmes = yield call(fetch, 'POST', '/programmes');
    yield put(programmesSuccess(programmes));
  } catch (error) {
    yield put(programmesFail(error));
  }
}

export function* getAdminDataWorker({ programmeid }) {
  try {
    const data = yield call(fetch, 'POST', '/analytics', { programmeid });
    yield put(dataSuccess(data));
  } catch (error) {
    yield put(dataFail(error));
  }
}

export function* getAdminDataWatcher() {
  yield* takeLatest(PROGRAMMES_ON_CHANGE, getAdminDataWorker);
}

export function* getProgrammesWatcher() {
  yield* takeLatest(PROGRAMMES_REQUEST, getProgrammesWorker);
}
