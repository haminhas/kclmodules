export const LOGIN_REQUEST = 'LOGIN_REQUEST';
export const LOGOUT = 'LOGOUT';
export const LOGIN_FAILED = 'LOGIN_FAILED';
export const LOGIN_SUCCEED = 'LOGIN_SUCCEED';
export const LOGIN_TOKEN_ADDED = 'LOGIN_TOKEN_ADDED';
export const LOGIN_TOKEN_DOES_NOT_EXIST = 'LOGIN_TOKEN_DOES_NOT_EXIST';
export const LOGIN_TOKEN_EXPIRED = 'LOGIN_TOKEN_EXPIRED';

export const login = () => ({
  type: LOGIN_REQUEST,
});

export const loginFail = error => ({
  type: LOGIN_FAILED,
  error,
});

export const loginSucceed = () => ({
  type: LOGIN_SUCCEED,
});
