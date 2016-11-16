import { fork } from 'redux-saga/effects';
import { authFlow } from 'app/containers/Auth/saga';

export default function* () {
  yield fork(authFlow);
}
