import React, { PropTypes } from 'react';
import style from './style.css';
import { Field } from 'redux-form';

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
        />
      {props.moduleCode}
    </label>
    </div>
  </li>
);

const { string } = PropTypes;

ModuleCard.propTypes = {
  moduleCode: string.isRequired,
  name: string.isRequired,
};

export default ModuleCard;
