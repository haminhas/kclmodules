export const AMEDNMENT_REQUEST = 'AMEDNMENT_REQUEST';
export const AMEDNMENT_SUCCESS = 'AMEDNMENT_SUCCESS';
export const AMEDNMENT_FAIL = 'AMEDNMENT_FAIL';

export const amendment = (timetable, oldMod, newMod) => ({
  type: AMEDNMENT_REQUEST,
  timetable,
  oldMod,
  newMod,
});

export const amendmentSuccess = modules => ({
  type: AMEDNMENT_SUCCESS,
  modules,
});

export const amendmentFail = err => ({
  type: AMEDNMENT_FAIL,
  err,
});
