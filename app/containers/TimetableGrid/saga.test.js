import {
  amendmentWorker,
  amendmentWatcher,
} from './saga';

import {
  AMEDNMENT_REQUEST,
} from './actions';

import fetch from 'app/fetch';
import { take, fork, call } from 'redux-saga/effects';


describe('TimetableGrid saga', () => {
  describe('amendment', () => {
    describe('amendmentWatcher', () => {
      it('watches for AMEDNMENT_REQUEST Action', () => {
        const watcher = amendmentWatcher();
        expect(watcher).to.deep.yield(take(AMEDNMENT_REQUEST));
      });

      it('Forks amendmentWorker when the watcher is triggered', () => {
        const watcher = amendmentWatcher();
        watcher.next();
        expect(watcher).to.deep.yield(fork(amendmentWorker, undefined));
      });
    });

    describe('amendmentWorker', () => {
      it('Passes correct parameters to fetch to check amendment', () => {
        const timetable = 'test';
        const oldMod = 'test';
        const newMod = 'test';
        const worker = amendmentWorker({ timetable, oldMod, newMod });
        expect(worker).to.deep.yield(call(fetch, 'POST', '/amend', { timetable, oldMod, newMod }));
      });
    });
  });
});
