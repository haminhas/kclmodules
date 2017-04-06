import React from 'react';
import TimetableCard from 'app/components/TimetableCard';

const TimetableListComponent = props => {
  const { modules, name } = props;
  const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];
  const smallDays = ['mon', 'tue', 'wed', 'thu', 'fri'];
  return (
    <ul>
    { modules.filter((x) => x[0].code === name).map((item, index) => (
      <div key={index}>
        { days.map((item1, index1) => (
          <TimetableCard key={index1} day={item1} sessions={ item.sort((a, b) =>
              Number(a.starttime.slice(0, -6)) > Number(b.starttime.slice(0, -6)))
              .filter((x) => x.day.toLowerCase() === smallDays[index1])}
          />
        ))}
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
