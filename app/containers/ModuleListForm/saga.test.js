import {
  checkClashWatcher,
  checkClashWorker,
} from './saga';

import {
  CHECK_CLASH_REQUEST,
} from './actions';

import { take, fork } from 'redux-saga/effects';

describe('ModuleListForm saga', () => {
  describe('Check Clash', () => {
    describe('checkClashWatcher', () => {
      it('watches for CHECK_CLASH_REQUEST Action', () => {
        const watcher = checkClashWatcher();
        expect(watcher).to.deep.yield(take(CHECK_CLASH_REQUEST));
      });

      it('Forks checkClashWorker when the watcher is triggered', () => {
        const watcher = checkClashWatcher();
        watcher.next();
        expect(watcher).to.deep.yield(fork(checkClashWorker, undefined));
      });
    });
  });
});
