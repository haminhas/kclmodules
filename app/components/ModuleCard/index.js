import React, { PropTypes } from 'react';
import style from './style.css';
import Checkbox from 'rc-checkbox';

const ModuleCard = props => (
  <li className={style.item}>
    <div className={style.cardContent}>
    <label>
      <Checkbox
        name={props.moduleCode}
      />
    { props.moduleCode }
    </label>
    </div>
  </li>
);

const { string } = PropTypes;

ModuleCard.propTypes = {
  moduleCode: string.isRequired,
};

export default ModuleCard;
