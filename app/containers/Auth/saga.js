import { put } from 'redux-saga/effects';
// import fetch from 'app/fetch';
import { takeLatest } from 'redux-saga';
import {
  LOGIN_REQUEST,
  loginFail,
  loginSucceed,
} from './actions';

export function* loginWorker() {
  try {
    // Router.get().transitionTo('/auth');
    // yield apply(browserHistory, browserHistory.push, ['/auth']);
    // yield call(fetch, 'GET', '/auth', {});
    yield put(loginSucceed());
  } catch (error) {
    yield put(loginFail(error));
  }
}

export function* loginWatcher() {
  yield* takeLatest(LOGIN_REQUEST, loginWorker);
}
