import React, { PropTypes } from 'react';

import style from './style.css';

const SmallContainer = props => (
  <div className={style.container}>
    {props.children}
  </div>
);

const { node } = PropTypes;

SmallContainer.propTypes = {
  children: node.isRequired,
};

export default SmallContainer;
