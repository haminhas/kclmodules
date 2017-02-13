export const GET_USERID_REQUEST = 'GET_USERID_REQUEST';
export const GET_USERID_SUCCESS = 'GET_USERID_SUCCESS';
export const GET_USERID_FAIL = 'GET_USERID_FAIL';
export const GET_MODULES_SUCCESS = 'GET_MODULES_SUCCESS';
export const GET_MODULES_FAIL = 'GET_MODULES_FAIL';
export const GET_MODULES_REQUEST = 'GET_MODULES_REQUEST';
export const CHECK_CLASH_REQUEST = 'CHECK_CLASH_REQUEST';
export const CHECK_CLASH_SUCCESS = 'CHECK_CLASH_SUCCESS';
export const CHECK_CLASH_FAIL = 'CHECK_CLASH_FAIL';
export const GET_MODULE_TIMETABLE_REQUEST = 'GET_MODULE_TIMETABLE_REQUEST';
export const GET_MODULE_TIMETABLE_SUCCESS = 'GET_MODULE_TIMETABLE_SUCCESS';
export const GET_MODULE_TIMETABLE_FAIL = 'GET_MODULE_TIMETABLE_FAIL';
export const AMEDNMENT_REQUEST = 'AMEDNMENT_REQUEST';
export const AMEDNMENT_SUCCESS = 'AMEDNMENT_SUCCESS';
export const AMEDNMENT_FAIL = 'AMEDNMENT_FAIL';

export const getModuleTimetable = (moduleCodes) => ({
  type: GET_MODULE_TIMETABLE_REQUEST,
  moduleCodes,
});

export const getModuleTimetableSuccess = timetables => ({
  type: GET_MODULE_TIMETABLE_SUCCESS,
  timetables,
});

export const getModuleTimetableFail = error => ({
  type: GET_MODULE_TIMETABLE_FAIL,
  error,
});

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

export const getModules = userID => ({
  type: GET_MODULES_REQUEST,
  userID,
});

export const getModulesSuccess = modules => ({
  type: GET_MODULES_SUCCESS,
  modules,
});

export const getModulesFail = error => ({
  type: GET_MODULES_FAIL,
  error,
});

export const checkClash = (data) => ({
  type: CHECK_CLASH_REQUEST,
  data,
});

export const checkClashSuccess = result => ({
  type: CHECK_CLASH_SUCCESS,
  result,
});

export const checkClashFail = error => ({
  type: CHECK_CLASH_FAIL,
  error,
});

export const amendment = timetable => ({
  type: AMEDNMENT_REQUEST,
  timetable,
});

export const amendmentSuccess = modules => ({
  type: AMEDNMENT_SUCCESS,
  modules,
});

export const amendmentFail = err => ({
  type: AMEDNMENT_FAIL,
  err,
});
