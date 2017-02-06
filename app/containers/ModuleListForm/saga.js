import { put, call } from 'redux-saga/effects';
import { takeLatest } from 'redux-saga';
import fetch from 'app/fetch';
import {
  AMEDNMENT_REQUEST,
  amendmentSuccess,
  amendmentFail,
} from './actions';

export function* amendmentWorker({ timetable }) {
  try {
    const modules = yield call(fetch, 'POST', '/amend', { timetable });
    yield put(amendmentSuccess(modules));
  } catch (error) {
    yield put(amendmentFail(error));
  }
}

export function* amendmentWatcher() {
  yield* takeLatest(AMEDNMENT_REQUEST, amendmentWorker);
}
