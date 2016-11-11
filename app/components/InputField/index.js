import React, { PropTypes } from 'react';
const { string, bool, shape } = PropTypes;
import style from './style.css';

const InputField = props => {
  let inputStyle = style.inputField;
  if (props.touched) {
    if (props.error) {
      inputStyle = `${inputStyle} ${style.inputFieldInvalid}`;
    } else {
      inputStyle = `${inputStyle} ${style.inputFieldValid}`;
    }
  }
  return (
    <div className={style.inputFieldContainer}>
      <label
        htmlFor={props.input.name}
        className={style.inputTitle}
      >{props.input.title || props.input.placeholder}
      </label>
      <input
        {...props.input}
        id={props.input.name}
        placeholder={props.input.placeholder}
        className={inputStyle}
      />
      {props.touched && props.error &&
        <div className={style.validationError}>{props.error}</div>
      }
    </div>
  );
};

InputField.propTypes = {
  error: string,
  touched: bool,
  input: shape({
    type: string,
    name: string,
    placeholder: string,
    title: string,
  }).isRequired,
};

export default InputField;
