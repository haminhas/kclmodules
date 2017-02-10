import React, { PropTypes } from 'react';
import NotificationBar from 'app/containers/Notification';
import Navbar from 'app/components/Navbar';

import style from './style.css';

const Root = props => (
  <div className={style.root}>
    <Navbar path={''} />
    <NotificationBar />

    <div className={style.mainContainer}>
      {props.children}
    </div>
  </div>
);

const { node } = PropTypes;

Root.propTypes = {
  children: node.isRequired,
};

export default Root;
