import { combineReducers } from 'redux';

import dashBoardReducer from 'app/containers/DashBoard/reducer';
import accountReducer from 'app/containers/AccountWidget/reducer';
import notificationReducer from 'app/containers/Notification/reducer';
import adminReducer from 'app/containers/Admin/reducer';

const appReducer = combineReducers({
  admin: adminReducer,
  dashBoard: dashBoardReducer,
  account: accountReducer,
  notification: notificationReducer,
});

export default function rootReducer(state, action) {
  if (action.type === 'AMEDNMENT_SUCCESS') {
    state = undefined;
  }
  return appReducer(state, action);
}
