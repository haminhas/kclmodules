import React from 'react';
import style from './style.css';
import TimetableRow from 'app/components/TimetableRow';

const TimetableCardComponent = props => {
  const { sessions, day } = props;
  return (
    <li>
    <table>
    <tr>
      <td className={style.day}>{day}</td>
    </tr>
    { sessions.map((item, index) => (
      <div key={index}>
        <TimetableRow
          item1={item.starttime}
          item2={item.name}
        />

        <TimetableRow
          item1={item.endtime}
          item2={`Group ${item.groupnumber}`}
        />

        {sessions.length > index + 1 && <hr/>}
      </div>
    ))}
    </table>
  </li>
  );
};

const { array, string } = React.PropTypes;

TimetableCardComponent.propTypes = {
  sessions: array.isRequired,
  day: string.isRequired,
};

export default TimetableCardComponent;


// <h2>{`${item1.day} ${item1.starttime}-${item1.endtime} ${item1.code} ${item1.name}`}</h2>
