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
  ADD_ADMIN_REQUEST,
  addAdminSuccess,
  addAdminFail,
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

export function* addAdminWorker({ email }) {
  try {
    const { adminEmail } = email;
    yield call(fetch, 'POST', '/addAdmin', { adminEmail });
    yield put(addAdminSuccess());
  } catch (error) {
    yield put(addAdminFail(error));
  }
}

export function* addAdminWatcher() {
  yield* takeLatest(ADD_ADMIN_REQUEST, addAdminWorker);
}

export function* getAdminDataWatcher() {
  yield* takeLatest(PROGRAMMES_ON_CHANGE, getAdminDataWorker);
}

export function* getProgrammesWatcher() {
  yield* takeLatest(PROGRAMMES_REQUEST, getProgrammesWorker);
}
