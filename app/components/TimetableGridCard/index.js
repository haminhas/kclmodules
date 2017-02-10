import React from 'react';
import style from './style.css';

const TimetableGridCardComponent = props => {
  const { sessions, day } = props;
  return (
    <li>
    <table>
    <tbody>

    <tr>
      <td className={style.day}>{day}</td>
    </tr>
    { sessions && sessions.sort((a, b) =>
        Number(a.starttime.slice(0, -6)) > Number(b.starttime.slice(0, -6)))
      .map((item, index) => (
      <div key={index} className={style.gridCardContainer}>
        <table className={style.gridCard}>
          <tr>
            <td rowSpan="3" style={{'background-color': item.color}} className={style.leftColor}/>
            <td className={style.times} >{item.starttime.slice(0, -3)} - {item.endtime.slice(0, -3)}</td>
          </tr>
          <tr>
            <td className={style.data}>{item.code}/{item.name}</td>
          </tr>
          <tr>
            <td className={style.group}>Group {item.groupnumber}</td>
          </tr>

        </table>

        {sessions.length > index + 1 && <hr className={style.line}/>}
      </div>
    ))}
    {sessions.length === 0 &&
      <div>
        <div>Manz Free</div>
        <div>Woop Woop</div>
      </div>
    }
    </tbody>
    </table>
  </li>
  );
};

const { array, string } = React.PropTypes;

TimetableGridCardComponent.propTypes = {
  sessions: array.isRequired,
  day: string.isRequired,
};

export default TimetableGridCardComponent;
