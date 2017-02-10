import React, { PropTypes } from 'react';
import style from './style.css';

import moodIcon from 'app/assets/ic-mood.svg';
import tickIcon from 'app/assets/ic-done.svg';

const { func, string, shape } = PropTypes;

let timeout;

const Notification = props => {
  clearTimeout(timeout);
  timeout = setTimeout(props.dismissNotification, 6000);
  return props.notification && (
    <div className={(props.notification.type === 'error' ? style.error : style.notification)}>
      <div className={style.contents}>
        <img
          alt="Profile"
          role="presentation"
          src={(props.notification.type === 'error' ? moodIcon : tickIcon)}
          className={style.moodIcon}
        />
        <p>{props.notification.message}</p>
      </div>
    </div>
  );
};

Notification.propTypes = {
  dismissNotification: func.isRequired,
  notification: shape({
    message: string,
    type: string,
  }),
};

export default Notification;
