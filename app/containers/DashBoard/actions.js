export const GET_USERID_REQUEST = 'GET_USERID_REQUEST';
export const GET_USERID_SUCCESS = 'GET_USERID_SUCCESS';
export const GET_USERID_FAIL = 'GET_USERID_FAIL';

export const getUserID = () => ({
  type: GET_USERID_REQUEST,
});

export const getUserIDSuccess = userID => ({
  type: GET_USERID_SUCCESS,
  userID,
});

export const getUserIDFail = error => ({
  type: GET_USERID_FAIL,
  error,
});
