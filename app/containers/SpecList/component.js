import React, { PropTypes, Component } from 'react';
import style from './style';
import SpecCard from 'app/components/SpecCard';

const { arrayOf, shape, string, number, func } = PropTypes;

export default class SpecListComponent extends Component {
  static propTypes = {
    specialisation: arrayOf(shape({
      id: number.isRequired,
      name: string.isRequired,
    })).isRequired,
    specOnChange: func.isRequired,
  };

  render() {
    const { specialisation, specOnChange } = this.props;
    return (
      <ul>
      { specialisation.map((item, index) => (
        <li key={index} className={style.item}>
          <SpecCard
            id={item.id}
            name={item.name}
            checked={item.checked}
            specOnChange={specOnChange}
          />
        </li>
      ))}
    </ul>
    );
  }
}
