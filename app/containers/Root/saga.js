import { fork } from 'redux-saga/effects';
import { getUserIDWatcher } from 'app/containers/DashBoard/saga';
import { loginWatcher, logoutWatcher } from 'app/containers/AccountWidget/saga';
import { checkClashWatcher } from 'app/containers/ModuleListForm/saga';
import { amendmentWatcher } from 'app/containers/TimetableGrid/saga';
import { getProgrammesWatcher, getAdminDataWatcher, addAdminWatcher } from 'app/containers/Admin/saga';

export default function* () {
  yield fork(getUserIDWatcher);
  yield fork(checkClashWatcher);
  yield fork(loginWatcher);
  yield fork(logoutWatcher);
  yield fork(amendmentWatcher);
  yield fork(getProgrammesWatcher);
  yield fork(getAdminDataWatcher);
  yield fork(addAdminWatcher);
}
