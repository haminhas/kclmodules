import { combineReducers } from 'redux';

import dashBoardReducer from 'app/containers/DashBoard/reducer';
import accountReducer from 'app/containers/AccountWidget/reducer';
import formReducer from 'app/containers/ModuleListForm/reducer';
import notificationReducer from 'app/containers/Notification/reducer';

export default combineReducers({
  dashBoard: dashBoardReducer,
  account: accountReducer,
  form: formReducer,
  notification: notificationReducer,
});
