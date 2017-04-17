import {
  APPLICATION_ERROR,
  APPLICATION_NOTIFICATION,
  DISMISS_NOTIFICATION,
} from './actions';

import {
  SPEC_FAIL,
} from 'app/containers/DashBoard/actions';

import {
  CLASH_SUCCESS,
  CLASH_FAIL,
  COMPULSORY_CLASH,
} from 'app/containers/ModuleListForm/actions';

import {
  AMEDNMENT_SUCCESS,
} from 'app/containers/TimetableGrid/actions';

import {
  ADD_ADMIN_SUCCESS,
  ADD_ADMIN_FAIL,
} from 'app/containers/Admin/actions';

export const errorState = message => ({
  message,
  type: 'error',
});

export const notificationState = message => ({
  message,
  type: 'notification',
});

export const errorReducer = (state = null, action) => {
  switch (action && action.type) {
  case ADD_ADMIN_FAIL:
    return errorState('Admin cannot be added. Please try again!');
  case ADD_ADMIN_SUCCESS:
    return notificationState('Admin added Successfully');
  case SPEC_FAIL:
    return errorState('Cannot get specialisations, Please try again');
  case AMEDNMENT_SUCCESS:
    return notificationState('Ammendment Successfull');
  case CLASH_SUCCESS:
    return notificationState('Valid Selection');
  case CLASH_FAIL:
    return errorState('Invalid Selection, Please try again');
  case APPLICATION_ERROR:
    return errorState(action.error.message);
  case APPLICATION_NOTIFICATION:
    return notificationState(action.message);
  case COMPULSORY_CLASH:
    return errorState(action.error);
  case DISMISS_NOTIFICATION:
    return null;
  default:
    return state;
  }
};

export default errorReducer;
