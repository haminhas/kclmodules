import reducer, { errorState, notificationState } from './reducer';
import {
  applicationError,
  applicationNotification,
  dismissNotification,
} from './actions';

describe('error reducer', () => {
  describe('initial state', () => {
    it('is initially null', () => {
      const expectedState = null;
      const actualState = reducer(null, {});
      expect(actualState).to.deep.equal(expectedState);
    });
  });

  describe('reducer body', () => {
    it('adds error to state on APPLICATION_ERROR', () => {
      const expectedState = new Error('Some message.');
      const action = applicationError(expectedState);
      const actualState = reducer(undefined, action);
      expect(actualState).to.deep.equal(errorState(expectedState.message));
    });

    it('adds error to state on APPLICATION_NOTIFICATION', () => {
      const expectedState = 'Some message.';
      const action = applicationNotification(expectedState);
      const actualState = reducer(undefined, action);
      expect(actualState).to.deep.equal(notificationState(expectedState));
    });

    it('clears error on  DISMISS_NOTIFICATION', () => {
      const action = dismissNotification();
      const actualState = reducer(undefined, action);
      expect(actualState).to.deep.equal(null);
    });
  });
});
