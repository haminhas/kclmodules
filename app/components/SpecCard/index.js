import React, { PropTypes } from 'react';
import style from './style';

const SpecCardComponent = props => {
  const { id, checked, name, specOnChange } = props;

  const toggleChecked = (event) => {
    const val = event.target.checked;
    specOnChange(id, name, val);
  };

  return (
      <div className={style.fieldContainer}>
        <label>
          <input
            className={style.field}
            type="checkbox"
            checked={checked}
            onChange={toggleChecked}
          />
          <div className={style.code}>{name}</div>
        </label>
      </div>
  );
};

const { string, bool, func, number } = PropTypes;

SpecCardComponent.propTypes = {
  name: string.isRequired,
  id: number.isRequired,
  checked: bool.isRequired,
  specOnChange: func.isRequired,
};

export default SpecCardComponent;
