export const GET_USERID_REQUEST = 'GET_USERID_REQUEST';
export const GET_USERID_SUCCESS = 'GET_USERID_SUCCESS';
export const GET_USERID_FAIL = 'GET_USERID_FAIL';
export const GET_MODULES_SUCCESS = 'GET_MODULES_SUCCESS';
export const GET_MODULES_FAIL = 'GET_MODULES_FAIL';
export const GET_MODULES_REQUEST = 'GET_MODULES_REQUEST';
export const GET_MODULE_TIMETABLE_REQUEST = 'GET_MODULE_TIMETABLE_REQUEST';
export const GET_MODULE_TIMETABLE_SUCCESS = 'GET_MODULE_TIMETABLE_SUCCESS';
export const GET_MODULE_TIMETABLE_FAIL = 'GET_MODULE_TIMETABLE_FAIL';
export const SPEC_SUCCESS = 'SPEC_SUCCESS';
export const SPEC_FAIL = 'SPEC_FAIL';
export const SPEC_ON_CHANGE = 'SPEC_ON_CHANGE';
export const EXPANDED_ON_CHANGE = 'EXPANDED_ON_CHANGE';

export const expandedOnChange = (expanded) => ({
  type: EXPANDED_ON_CHANGE,
  expanded,
});

export const specOnChange = (id) => ({
  type: SPEC_ON_CHANGE,
  id,
});

export const specSuccess = specialisation => ({
  type: SPEC_SUCCESS,
  specialisation,
});

export const specFail = error => ({
  type: SPEC_FAIL,
  error,
});

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

export const getUserIDSuccess = (userID, isAdmin) => ({
  type: GET_USERID_SUCCESS,
  userID,
  isAdmin,
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
