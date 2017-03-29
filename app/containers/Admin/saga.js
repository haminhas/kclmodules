import { put, call } from 'redux-saga/effects';
import { takeLatest } from 'redux-saga';
import fetch from 'app/fetch';

import {
  PROGRAMMES_REQUEST,
  programmesSuccess,
  programmesFail,
} from './actions';

export function* getProgrammesWorker() {
  try {
    const programmes = yield call(fetch, 'POST', '/programmes');
    yield put(programmesSuccess(programmes));
  } catch (error) {
    yield put(programmesFail(error));
  }
}

export function* getProgrammesWatcher() {
  yield* takeLatest(PROGRAMMES_REQUEST, getProgrammesWorker);
}
