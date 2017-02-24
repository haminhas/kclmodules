import { APPLICATION_ERROR, APPLICATION_NOTIFICATION, DISMISS_NOTIFICATION } from './actions';

import {
  SPEC_FAIL,
} from 'app/containers/DashBoard/actions';

import {
  CHECK_CLASH_SUCCESS,
} from 'app/containers/ModuleListForm/actions';

import {
  AMEDNMENT_SUCCESS,
} from 'app/containers/TimetableGrid/actions';

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
  case SPEC_FAIL:
    return errorState('Cannot get specialisations, Please try again');
  case AMEDNMENT_SUCCESS:
    return notificationState('Ammendment Successfull');
  case CHECK_CLASH_SUCCESS:
    if (!action.result[0]) {
      return errorState('Invalid Selection, Please try again');
    }
    return notificationState('Valid Selection');
  case APPLICATION_ERROR:
    return errorState(action.error.message);
  case APPLICATION_NOTIFICATION:
    return notificationState(action.message);
  case DISMISS_NOTIFICATION:
    return null;
  default:
    return state;
  }
};

export default errorReducer;
