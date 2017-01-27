import {
  GET_USERID_REQUEST,
  GET_USERID_SUCCESS,
  GET_USERID_FAIL,
  GET_USER_MODULES_SUCCESS,
  GET_USER_MODULES_FAIL,
} from './actions';

const getInitialState = () => ({
  userID: '',
  loading: true,
});

const dashBoardReducer = (state = getInitialState(), action) => {
  switch (action && action.type) {
  case GET_USERID_REQUEST:
    return {
      ...state,
      loading: true,
    };
  case GET_USER_MODULES_SUCCESS:
    return {
      ...state,
      modules: action.modules,
      loading: true,
    };
  case GET_USER_MODULES_FAIL:
  case GET_USERID_FAIL:
    return {
      ...state,
      loading: false,
    };
  case GET_USERID_SUCCESS:
    return {
      ...state,
      loading: false,
      userID: action.userID
    };
  default:
    return state;
  }
};

export default dashBoardReducer;
