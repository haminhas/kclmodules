import {
  GET_USERID_REQUEST,
  GET_USERID_SUCCESS,
  GET_USERID_FAIL,
  GET_MODULES_SUCCESS,
  GET_MODULES_FAIL,
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
  case GET_MODULES_SUCCESS:
    for (let i = 0; i < action.modules[0].length; i++) {
      action.modules[1] = action.modules[1].filter((x) =>
        x.code !== action.modules[0][i].code
      );
    }
    return {
      ...state,
      modules: action.modules[0],
      newModules: action.modules[1],
      loading: true,
    };
  case GET_MODULES_FAIL:
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
