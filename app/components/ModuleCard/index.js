import React, { PropTypes } from 'react';
import style from './style.css';
import { Field } from 'redux-form';
import classnames from 'classnames';

const ModuleCard = props => (
  <li className={style.item}>
    <div className={style.cardContent}>
      <label>
        <Field
          name={`${props.name}.${props.moduleCode}`}
          id={props.moduleCode}
          title="Code"
          component="input"
          type="checkbox"
          disabled={props.fieldDisabled}
        />
      {props.moduleCode}
    </label>
    {props.fieldDisabled &&
      <div className={classnames(style.button, style.remove)}>Compulsory Module</div>
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
