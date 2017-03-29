export const PROGRAMMES_FAIL = 'PROGRAMMES_FAIL';
export const PROGRAMMES_SUCCESS = 'PROGRAMMES_SUCCESS';
export const PROGRAMMES_REQUEST = 'PROGRAMMES_REQUEST';

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
