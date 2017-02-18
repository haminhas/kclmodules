import React, { PropTypes } from 'react';
import style from './style';

const SpecCardComponent = props => {
  const { checked, name } = props;

  // const toggleChecked = (event) => {
  //   const val = event.target.checked;
  //   moduleOnChange(name, moduleCode, val);
  // };

  return (
      <div className={style.fieldContainer}>
        <label>
          <input
            className={style.field}
            type="checkbox"
            checked={checked}
          />
          <div className={style.code}>{name}</div>
        </label>
      </div>
  );
};

const { string, bool } = PropTypes;

SpecCardComponent.propTypes = {
  name: string.isRequired,
  checked: bool.isRequired,
};

export default SpecCardComponent;
