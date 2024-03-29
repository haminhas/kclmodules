export const MODULE_ON_CHANGE = 'MODULE_ON_CHANGE';
export const CHECK_CLASH_REQUEST = 'CHECK_CLASH_REQUEST';
export const CHECK_CLASH_SUCCESS = 'CHECK_CLASH_SUCCESS';
export const CHECK_CLASH_FAIL = 'CHECK_CLASH_FAIL';
export const CLASH_SUCCESS = 'CLASH_SUCCESS';
export const CLASH_FAIL = 'CLASH_FAIL';
export const COMPULSORY_CLASH = 'COMPULSORY_CLASH';
export const SEARCH_MODULE = 'SEARCH_MODULE';

export const moduleOnChange = (name, code, checked) => ({
  type: MODULE_ON_CHANGE,
  name,
  code,
  checked
});

export const checkClash = (data) => ({
  type: CHECK_CLASH_REQUEST,
  data,
});

export const checkClashSuccess = result => ({
  type: CHECK_CLASH_SUCCESS,
  result,
});

export const clashSuccess = result => ({
  type: CLASH_SUCCESS,
  result,
});

export const clashFail = result => ({
  type: CLASH_FAIL,
  result,
});

export const checkClashFail = error => ({
  type: CHECK_CLASH_FAIL,
  error,
});

export const compulsoryClash = error => ({
  type: COMPULSORY_CLASH,
  error,
});

export const searchModule = name => ({
  type: SEARCH_MODULE,
  name,
});
