import { combineReducers } from 'redux';

import dashBoardReducer from 'app/containers/DashBoard/reducer';
import accountReducer from 'app/containers/AccountWidget/reducer';

export default combineReducers({
  dashBoard: dashBoardReducer,
  account: accountReducer,
});
