import React, { PropTypes } from 'react';
import classnames from 'classnames';
import style from './style.css';

const Form = props => {
  const {
    buttonText,
    children,
    handleSubmit,
    pristine,
    submitting,
    reset,
    invalid,
  } = props;

  const onSubmit = (...args) => {
    handleSubmit(...args);
    reset();
  };

  const buttonStyle = classnames(style.button, {
    [style.invalid]: props.invalid,
  });

  return (
    <form onSubmit={onSubmit}>
      <div>{children}</div>
      <button
        type="submit"
        disabled={pristine || submitting || invalid}
        className={buttonStyle}
      >{buttonText}</button>
    </form>
  );
};

const { func, bool, node, string } = PropTypes;

Form.propTypes = {
  buttonText: string.isRequired,
  children: node.isRequired,
  handleSubmit: func.isRequired,
  pristine: bool.isRequired,
  submitting: bool.isRequired,
  reset: func.isRequired,
  invalid: bool.isRequired,
};

export default Form;
