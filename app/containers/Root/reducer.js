import { combineReducers } from 'redux';

import dashBoardReducer from 'app/containers/DashBoard/reducer';

export default combineReducers({
  dashBoard: dashBoardReducer,
});
