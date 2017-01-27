export const GET_USERID_REQUEST = 'GET_USERID_REQUEST';
export const GET_USERID_SUCCESS = 'GET_USERID_SUCCESS';
export const GET_USERID_FAIL = 'GET_USERID_FAIL';
export const GET_USER_MODULES_SUCCESS = 'GET_USER_MODULES_SUCCESS';
export const GET_USER_MODULES_FAIL = 'GET_USER_MODULES_FAIL';
export const GET_USER_MODULES_REQUEST = 'GET_USER_MODULES_REQUEST';

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

export const getUserModules = userID => ({
  type: GET_USER_MODULES_REQUEST,
  userID,
});

export const getUserModulesSuccess = modules => ({
  type: GET_USER_MODULES_SUCCESS,
  modules,
});

export const getUserModulesFail = error => ({
  type: GET_USER_MODULES_FAIL,
  error,
});
