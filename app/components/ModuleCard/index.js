import React, { PropTypes } from 'react';
import style from './style';
const { func, string, bool} = PropTypes;
const ModuleListCardComponent = props => {
  const { moduleCode, fieldDisabled, checked, moduleOnChange, name } = props;

  const toggleChecked = (event) => {
    const val = event.target.checked;
    moduleOnChange(name, moduleCode, val);
  };

  return (
    <div className={style.fieldContainer}>
    { fieldDisabled &&
      <label>
        <input
          className={style.field}
          type="checkbox"
          checked={checked}
          onChange={toggleChecked}
        />
        <div className={style.code}>{moduleCode}</div>
        <div className={style.compulsory}> - Compulsory</div>
    </label>
      ||
      <label>
        <input
          className={style.field}
          type="checkbox"
          checked={checked}
          onChange={toggleChecked}
        />
        <div className={style.code}>{moduleCode}</div>
      </label>
    }
    </div>
  );
};

ModuleListCardComponent.propTypes = {
  moduleCode: string.isRequired,
  name: string.isRequired,
  fieldDisabled: bool,
  checked: bool.isRequired,
  moduleOnChange: func.isRequired,
};

export default ModuleListCardComponent;
