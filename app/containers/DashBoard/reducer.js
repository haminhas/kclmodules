import {
  GET_USERID_REQUEST,
  GET_USERID_SUCCESS,
  GET_USERID_FAIL,
} from './actions';

const getInitialState = () => ({
  userID: '',
  loading: false,
});

const dashBoardReducer = (state = getInitialState(), action) => {
  switch (action && action.type) {
  case GET_USERID_REQUEST:
    return {
      ...state,
      loading: true,
    };
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
