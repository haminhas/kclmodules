import { fork } from 'redux-saga/effects';
import { getUserIDWatcher } from 'app/containers/DashBoard/saga';


export default function* () {
  yield fork(getUserIDWatcher);
}
