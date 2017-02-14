export const APPLICATION_ERROR = 'APPLICATION_ERROR';
export const APPLICATION_NOTIFICATION = 'APPLICATION_NOTIFICATION';
export const DISMISS_NOTIFICATION = 'DISMISS_NOTIFICATION';

export const applicationError = error => ({
  type: APPLICATION_ERROR,
  error,
});

export const applicationNotification = message => ({
  type: APPLICATION_NOTIFICATION,
  message,
});

export const dismissNotification = () => ({
  type: DISMISS_NOTIFICATION,
});
