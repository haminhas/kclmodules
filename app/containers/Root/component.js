import React, { PropTypes } from 'react';
import Navbar from 'app/components/Navbar';

import style from './style.css';

const Root = props => (
  <div className={style.root}>
    <Navbar path={''} />
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
