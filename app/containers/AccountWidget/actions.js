export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGIN_FAIL = 'LOGIN_FAIL';
export const LOGOUT_SUCCESS = 'LOGOUT_SUCCESS';
export const LOGOUT_FAIL = 'LOGOUT_FAIL';
export const LOGOUT_REQUEST = 'LOGOUT_REQUEST';
export const LOGIN_REQUEST = 'LOGIN_REQUEST';


export const loginSuccess = () => ({
  type: LOGIN_SUCCESS,
});

export const loginFail = error => ({
  type: LOGIN_FAIL,
  error,
});

export const logoutSuccess = () => ({
  type: LOGOUT_SUCCESS,
});

export const logoutFail = error => ({
  type: LOGOUT_FAIL,
  error,
});

export const logout = () => ({
  type: LOGOUT_REQUEST,
});

export const login = () => ({
  type: LOGIN_REQUEST,
});
