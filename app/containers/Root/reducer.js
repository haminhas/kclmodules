import { combineReducers } from 'redux';

import userReducer from 'app/containers/DashBoard/reducer';

export default combineReducers({
  userID: userReducer,
});
