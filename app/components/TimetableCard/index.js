import React from 'react';
import style from './style.css';
import TimetableRow from 'app/components/TimetableRow';

const TimetableCardComponent = props => {
  const { sessions, day } = props;
  return (
    <li>
    <table>
    <tbody>

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
    </tbody>
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
