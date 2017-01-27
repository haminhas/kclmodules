import { fork } from 'redux-saga/effects';
import { getUserIDWatcher } from 'app/containers/DashBoard/saga';
import { loginWatcher, logoutWatcher } from 'app/containers/AccountWidget/saga';


export default function* () {
  yield fork(getUserIDWatcher);
  yield fork(loginWatcher);
  yield fork(logoutWatcher);
}
