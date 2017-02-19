import React from 'react';
import style from './style';
import SpecCard from 'app/components/SpecCard';

const SpecListComponent = props => {
  const { specialisation, specOnChange } = props;
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
};

const { arrayOf, shape, string, number, func } = React.PropTypes;

SpecListComponent.propTypes = {
  specialisation: arrayOf(shape({
    id: number.isRequired,
    name: string.isRequired,
  })).isRequired,
  specOnChange: func.isRequired,
};

export default SpecListComponent;
