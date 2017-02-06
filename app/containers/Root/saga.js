import { fork } from 'redux-saga/effects';
import { getUserIDWatcher, checkClashWatcher } from 'app/containers/DashBoard/saga';
import { loginWatcher, logoutWatcher } from 'app/containers/AccountWidget/saga';
import { amendmentWatcher } from 'app/containers/ModuleListForm/saga';


export default function* () {
  yield fork(getUserIDWatcher);
  yield fork(checkClashWatcher);
  yield fork(loginWatcher);
  yield fork(logoutWatcher);
  yield fork(amendmentWatcher);
}
