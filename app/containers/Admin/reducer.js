const getInitialState = () => ({
  loading: false,
  programmes: [],
});

import {
  PROGRAMMES_SUCCESS,
  PROGRAMMES_REQUEST,
  PROGRAMMES_FAIL,
  PROGRAMMES_ON_CHANGE,
  DATA_SUCCESS,
} from './actions';

const adminReducer = (state = getInitialState(), action) => {
  switch (action && action.type) {
  case DATA_SUCCESS:
    console.log(action.data.moduleData);
    // const newData = action.data.map((x) => {
    //   return { newModule: x.newmodule, newCount: x.newcount };
    // });
    return {
      ...state,
      // newData
    };
  case PROGRAMMES_ON_CHANGE:
    return {
      ...state,
      programmeid: action.programmeid,
    };
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
