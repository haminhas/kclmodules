import { fork } from 'redux-saga/effects';
import { loginWatcher } from 'app/containers/Auth/saga';

export default function* () {
  yield fork(loginWatcher);
}
