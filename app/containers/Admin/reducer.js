const getInitialState = () => ({
  loading: false,
  programmes: [],
});

import {
  PROGRAMMES_SUCCESS,
  PROGRAMMES_REQUEST,
  PROGRAMMES_FAIL,
} from './actions';

const adminReducer = (state = getInitialState(), action) => {
  switch (action && action.type) {
  case PROGRAMMES_SUCCESS:
    return {
      ...state,
      programmes: action.programmes,
      loading: false,
    };
  case PROGRAMMES_REQUEST:
    return {
      ...state,
      loading: true,
    };
  case PROGRAMMES_FAIL:
    return {
      ...state,
      loading: false,
    };
  default:
    return state;
  }
};

export default adminReducer;
