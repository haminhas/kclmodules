import React, { PropTypes } from 'react';
import classnames from 'classnames';
import style from './style.css';

const Title = props => {
  const className = classnames(style.title, {
    [style.large]: props.type === 'large',
  });
  return (
    <h1 className={className}>
      {props.children}
    </h1>
  );
};

const { node, string } = PropTypes;

Title.propTypes = {
  children: node.isRequired,
  type: string,
};

export default Title;
