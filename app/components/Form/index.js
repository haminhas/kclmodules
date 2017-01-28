import React, { PropTypes } from 'react';
import classnames from 'classnames';
import style from './style.css';

const Form = props => {
  const {
    buttonText,
    otherButtonText,
    children,
    handleSubmit,
    pristine,
    submitting,
    reset,
    invalid,
    otherSubmit
  } = props;

  const onSubmit = (...args) => {
    handleSubmit(...args);
    reset();
  };

  const otherOnSubmit = (...args) => {
    otherSubmit(...args);
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
        onClick={() => otherOnSubmit()}
      >{otherButtonText}</button>
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
  otherButtonText: string.isRequired,
  children: node.isRequired,
  handleSubmit: func.isRequired,
  pristine: bool,
  submitting: bool,
  reset: func,
  invalid: bool,
  otherSubmit: func.isRequired,
};

export default Form;
