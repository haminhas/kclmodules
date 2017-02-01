import {
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT_SUCCESS,
  LOGOUT_FAIL,
} from './actions';

const getInitialState = () => ({
  isLoggedIn: false,
});

const accountReducer = (state = getInitialState(), action) => {
  switch (action && action.type) {
  case LOGOUT_FAIL:
  case LOGIN_FAIL:
    return {
      ...state,
    };
  case LOGOUT_SUCCESS:
    return {
      ...state,
      isLoggedIn: false
    };
  case LOGIN_SUCCESS:
    return {
      ...state,
      isLoggedIn: true
    };
  default:
    return state;
  }
};

export default accountReducer;
