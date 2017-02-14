import { combineReducers } from 'redux';

import dashBoardReducer from 'app/containers/DashBoard/reducer';
import accountReducer from 'app/containers/AccountWidget/reducer';
import notificationReducer from 'app/containers/Notification/reducer';

const appReducer = combineReducers({
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
