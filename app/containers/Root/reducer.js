import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';

import dashBoardReducer from 'app/containers/DashBoard/reducer';
import accountReducer from 'app/containers/AccountWidget/reducer';

export default combineReducers({
  dashBoard: dashBoardReducer,
  account: accountReducer,
  form: formReducer,
});
