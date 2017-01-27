import dashBoardReducer from './reducer';

import {
  GET_USERID_REQUEST,
  GET_USERID_SUCCESS,
  GET_USERID_FAIL,
} from './actions';

const initialState = {
  loading: false,
  userID: '',
};

const userData = {
  loading: false,
  userID: 'testID',
};

describe('dashBoard reducer', () => {
  it('has initial state of an empty string of userID and loading false', () => {
    const expectedState = {
      loading: false,
      userID: '',
    };
    const actualState = dashBoardReducer(undefined, {});
    expect(actualState).to.deep.equal(expectedState);
  });

  it('sets loading to true on GET_USERID_REQUEST', () => {
    const expectedState = {
      loading: true,
      userID: '',
    };
    const action = {
      type: GET_USERID_REQUEST,
    };
    const actualState = dashBoardReducer(initialState, action);
    expect(actualState).to.deep.equal(expectedState);
  });

  it('sets loading to false on GET_USERID_FAIL', () => {
    const expectedState = {
      loading: false,
      userID: '',
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
