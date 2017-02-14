import React from 'react';
import TimetableCard from 'app/components/TimetableCard';

const TimetableListComponent = props => {
  const { modules, name } = props;
  return (
    <ul>
    { modules.filter((x) => x[0].code === name).map((item, index) => (
      <div key={index}>
        <TimetableCard day="Monday" sessions={item.filter((x) => x.day.toLowerCase() === 'mon')}/>
        <TimetableCard day="Tuesday" sessions={item.filter((x) => x.day.toLowerCase() === 'tue')}/>
        <TimetableCard day="Wednesday" sessions={item.filter((x) => x.day.toLowerCase() === 'wed')}/>
        <TimetableCard day="Thursday" sessions={item.filter((x) => x.day.toLowerCase() === 'thu')}/>
        <TimetableCard day="Friday" sessions={item.filter((x) => x.day.toLowerCase() === 'fri')}/>
      </div>
    ))}
  </ul>
  );
};

const { array, string } = React.PropTypes;

TimetableListComponent.propTypes = {
  modules: array.isRequired,
  name: string.isRequired,
};

export default TimetableListComponent;
