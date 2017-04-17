export const PROGRAMMES_FAIL = 'PROGRAMMES_FAIL';
export const PROGRAMMES_SUCCESS = 'PROGRAMMES_SUCCESS';
export const PROGRAMMES_REQUEST = 'PROGRAMMES_REQUEST';
export const PROGRAMMES_ON_CHANGE = 'PROGRAMMES_ON_CHANGE';
export const DATA_SUCCESS = 'DATA_SUCCESS';
export const DATA_FAIL = 'DATA_FAIL';
export const ADD_ADMIN_SUCCESS = 'ADD_ADMIN_SUCCESS';
export const ADD_ADMIN_REQUEST = 'ADD_ADMIN_REQUEST';
export const ADD_ADMIN_FAIL = 'ADD_ADMIN_FAIL';

export const addAdminSuccess = () => ({
  type: ADD_ADMIN_SUCCESS,
});

export const addAdmin = email => ({
  type: ADD_ADMIN_REQUEST,
  email,
});

export const addAdminFail = error => ({
  type: ADD_ADMIN_FAIL,
  error,
});

export const programmesSuccess = programmes => ({
  type: PROGRAMMES_SUCCESS,
  programmes,
});

export const getProgrammes = () => ({
  type: PROGRAMMES_REQUEST,
});

export const programmesFail = error => ({
  type: PROGRAMMES_FAIL,
  error,
});

export const programmesOnChange = programmeid => ({
  type: PROGRAMMES_ON_CHANGE,
  programmeid,
});

export const dataSuccess = data => ({
  type: DATA_SUCCESS,
  data,
});

export const dataFail = error => ({
  type: DATA_FAIL,
  error,
});
