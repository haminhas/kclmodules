export const MODULE_ON_CHANGE = 'MODULE_ON_CHANGE';
export const CHECK_CLASH_REQUEST = 'CHECK_CLASH_REQUEST';
export const CHECK_CLASH_SUCCESS = 'CHECK_CLASH_SUCCESS';
export const CHECK_CLASH_FAIL = 'CHECK_CLASH_FAIL';

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

export const checkClashFail = error => ({
  type: CHECK_CLASH_FAIL,
  error,
});
