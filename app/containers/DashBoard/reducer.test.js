import dashBoardReducer from './reducer';

import {
  GET_USERID_REQUEST,
  GET_USERID_SUCCESS,
  GET_USERID_FAIL,
} from './actions';

const initialState = {
  userID: '',
  loading: true,
  firstClash: false,
  checkClash: false,
  checkClashLoading: false,
};

const userData = {
  loading: false,
  userID: 'testID',
};

describe('dashBoard reducer', () => {
  it('has correct initialState', () => {
    const expectedState = {
      userID: '',
      loading: true,
      firstClash: false,
      expanded: false,
      checkClash: false,
      checkClashLoading: false,
    };
    const actualState = dashBoardReducer(undefined, {});
    expect(actualState).to.deep.equal(expectedState);
  });

  it('sets loading to true on GET_USERID_REQUEST', () => {
    const expectedState = {
      userID: '',
      loading: true,
      firstClash: false,
      checkClash: false,
      checkClashLoading: false,
    };
    const action = {
      type: GET_USERID_REQUEST,
    };
    const actualState = dashBoardReducer(initialState, action);
    expect(actualState).to.deep.equal(expectedState);
  });

  it('sets loading to false on GET_USERID_FAIL', () => {
    const expectedState = {
      userID: '',
      loading: false,
      firstClash: false,
      checkClash: false,
      checkClashLoading: false,
    };
    const action = {
      type: GET_USERID_FAIL,
    };
    const actualState = dashBoardReducer(initialState, action);
    expect(actualState).to.deep.equal(expectedState);
  });

  it('sets state to userID on GET_USERID_SUCCESS and loading to false', () => {
    const initialStateTrue = {
      loading: true,
      userID: '',
    };
    const expectedState = {
      loading: false,
      userID: userData.userID,
    };
    const action = {
      type: GET_USERID_SUCCESS,
      userID: userData.userID,
    };
    const actualState = dashBoardReducer(initialStateTrue, action);
    expect(actualState).to.deep.equal(expectedState);
  });
});
