import {
  getUserIDWorker,
  getUserIDWatcher,
} from './saga';

import {
  GET_USERID_REQUEST,
} from './actions';

import fetch from 'app/fetch';
import { take, fork, call } from 'redux-saga/effects';


describe('DashBoard saga', () => {
  describe('Get userID', () => {
    describe('getUserIDWatcher', () => {
      it('watches for GET_USERID_REQUEST Action', () => {
        const watcher = getUserIDWatcher();
        expect(watcher).to.deep.yield(take(GET_USERID_REQUEST));
      });

      it('Forks getUserIDWorker when the watcher is triggered', () => {
        const watcher = getUserIDWatcher();
        watcher.next();
        expect(watcher).to.deep.yield(fork(getUserIDWorker, undefined));
      });
    });

    describe('getUserIDWorker', () => {
      it('Passes correct parameters to fetch to get userID', () => {
        const worker = getUserIDWorker();
        expect(worker).to.deep.yield(call(fetch, 'GET', '/user'));
      });
    });
  });
});
