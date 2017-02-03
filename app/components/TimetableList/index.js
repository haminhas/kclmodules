import React from 'react';
import TimetableCard from 'app/components/TimetableCard';

const TimetableListComponent = props => {
  const { modules, name } = props;
  return (
    <ul>
    { modules.filter((x) => x[0].code === name).map((item, index) => (
      <div key={index}>
        <TimetableCard day="Monday" sessions={item.filter((x) => x.day === 'Mon')}/>
        <TimetableCard day="Tuesday" sessions={item.filter((x) => x.day === 'Tue')}/>
        <TimetableCard day="Wednesday" sessions={item.filter((x) => x.day === 'Wed')}/>
        <TimetableCard day="Thursday" sessions={item.filter((x) => x.day === 'Thu')}/>
        <TimetableCard day="Friday" sessions={item.filter((x) => x.day === 'Fri')}/>
      </div>
    ))}
  </ul>
  );
};

const { arrayOf, shape, string } = React.PropTypes;

TimetableListComponent.propTypes = {
  modules: arrayOf(shape({
    code: string.isRequired,
  })).isRequired,
  name: string.isRequired,
};

export default TimetableListComponent;
