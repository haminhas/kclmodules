import React, { PropTypes } from 'react';
import { Field } from 'redux-form';
import style from './style.css';

const ModuleCard = props => (
  <li>
    <div >
      <label>
        <Field
          className={style.field}
          name={`${props.name}.${props.moduleCode}`}
          id={props.moduleCode}
          title="Code"
          component="input"
          type="checkbox"
          disabled={props.fieldDisabled}
        />
      <div className={style.code}>{props.moduleCode}</div>
    </label>

    {props.fieldDisabled &&
      <div className={style.compulsory}>Compulsory Module</div>
    }
    </div>
  </li>
);

const { string, bool } = PropTypes;

ModuleCard.propTypes = {
  moduleCode: string.isRequired,
  name: string.isRequired,
  fieldDisabled: bool.isRequired,
};

export default ModuleCard;
