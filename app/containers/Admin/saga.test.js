import {
  getProgrammesWorker,
  getProgrammesWatcher,
  getAdminDataWorker,
  getAdminDataWatcher
} from './saga';

import {
  PROGRAMMES_REQUEST,
  PROGRAMMES_ON_CHANGE,
} from './actions';

import fetch from 'app/fetch';
import { take, fork, call } from 'redux-saga/effects';

describe('Admin saga', () => {
  describe('Get Programmes', () => {
    describe('getProgrammesWatcher', () => {
      it('watches for PROGRAMMES_REQUEST Action', () => {
        const watcher = getProgrammesWatcher();
        expect(watcher).to.deep.yield(take(PROGRAMMES_REQUEST));
      });

      it('Forks getProgrammesWorker when the watcher is triggered', () => {
        const watcher = getProgrammesWatcher();
        watcher.next();
        expect(watcher).to.deep.yield(fork(getProgrammesWorker, undefined));
      });
    });

    describe('getProgrammesWorker', () => {
      it('Passes correct parameters to fetch to get programmes', () => {
        const worker = getProgrammesWorker();
        expect(worker).to.deep.yield(call(fetch, 'POST', '/programmes'));
      });
    });
  });

  describe('Get Graph Data', () => {
    describe('getAdminDataWatcher', () => {
      it('watches for PROGRAMMES_ON_CHANGE Action', () => {
        const watcher = getAdminDataWatcher();
        expect(watcher).to.deep.yield(take(PROGRAMMES_ON_CHANGE));
      });

      it('Forks getAdminDataWorker when the watcher is triggered', () => {
        const watcher = getAdminDataWatcher();
        watcher.next();
        expect(watcher).to.deep.yield(fork(getAdminDataWorker, undefined));
      });
    });

    describe('getAdminDataWorker', () => {
      it('Passes correct parameters to fetch to get graph data', () => {
        const programmeid = 'testid';
        const worker = getAdminDataWorker({ programmeid });
        expect(worker).to.deep.yield(call(fetch, 'POST', '/analytics', { programmeid }));
      });
    });
  });
});
