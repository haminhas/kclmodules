export const AMEDNMENT_REQUEST = 'AMEDNMENT_REQUEST';
export const AMEDNMENT_SUCCESS = 'AMEDNMENT_SUCCESS';
export const AMEDNMENT_FAIL = 'AMEDNMENT_FAIL';

export const amendment = timetable => ({
  type: AMEDNMENT_REQUEST,
  timetable,
});

export const amendmentSuccess = result => ({
  type: AMEDNMENT_SUCCESS,
  result,
});

export const amendmentFail = err => ({
  type: AMEDNMENT_FAIL,
  err,
});
