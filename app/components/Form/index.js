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
    newTimetable,
    otherText,
    amendment,
  } = props;

  const onSubmit = (...args) => {
    handleSubmit(...args);
    reset();
  };

  const onClickSubmit = () => {
    amendment(newTimetable);
    reset();
  };

  const disabled = newTimetable && !newTimetable.length;

  const buttonStyle = classnames(style.button, {
    [style.invalid]: props.invalid || disabled,
  });

  return (
    <form onSubmit={onSubmit}>
      <div>{children}</div>
      <button
        type="submit"
        disabled={pristine || submitting || invalid}
        className={buttonStyle}
      >{buttonText}</button>
      <button
        type="submit"
        disabled={disabled}
        className={buttonStyle}
        onClick={onClickSubmit}
      >{otherText}</button>
    </form>
  );
};

const { func, bool, node, string, array} = PropTypes;

Form.propTypes = {
  buttonText: string.isRequired,
  children: node.isRequired,
  handleSubmit: func.isRequired,
  pristine: bool.isRequired,
  submitting: bool.isRequired,
  reset: func.isRequired,
  invalid: bool.isRequired,
  otherText: string.isRequired,
  newTimetable: array.isRequired,
  amendment: func.isRequired,
};

export default Form;
