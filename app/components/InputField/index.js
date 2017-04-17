import React, { PropTypes } from 'react';
const { string, bool, shape } = PropTypes;
import style from './style.css';

const InputField = props => {
  let inputStyle = style.inputField;
  if (props.meta.touched) {
    if (props.meta.error) {
      inputStyle = `${inputStyle} ${style.inputFieldInvalid}`;
    } else {
      inputStyle = `${inputStyle} ${style.inputFieldValid}`;
    }
  }

  return (
    <div className={style.inputFieldContainer}>
      <label
        htmlFor={props.name}
        className={style.inputTitle}
      >{props.title || props.placeholder}
      </label>
      <input
        {...props.input}
        id={props.name}
        placeholder={props.placeholder}
        className={inputStyle}
      />
      {props.meta.touched && props.meta.error &&
        <div className={style.validationError}>{props.meta.error}</div>
      }
    </div>
  );
};

InputField.propTypes = {
  name: string,
  error: string,
  placeholder: string,
  title: string,
  touched: bool,
  input: shape({
    type: string,
    name: string,
    placeholder: string,
    title: string,
  }).isRequired,
  meta: shape({
    touched: bool,
    error: string,
  }).isRequired,
};

export default InputField;
