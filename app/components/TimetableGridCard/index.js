import React from 'react';
import style from './style.css';

const TimetableGridCardComponent = props => {
  const { sessions, day, hideDay } = props;
  return (
    <li>
      <div className={style.gridCardCon} >
        <table className={style.gridCardTable}>
          <tbody>

          { !hideDay &&
            <tr>
              <td className={style.day}>{day}</td>
            </tr>
          }

          { sessions && sessions.sort((a, b) =>
            Number(a.starttime.slice(0, -6)) > Number(b.starttime.slice(0, -6)))
            .map((item, index) => (
            <div key={index} className={style.gridCardContainer}>
              <table className={style.gridCard}>
                <tr>
                  <td rowSpan="4" style={{'backgroundColor': item.color}} className={style.leftColor}/>
                  <td className={style.times} >{item.starttime.slice(0, -3)} - {item.endtime.slice(0, -3)}</td>
                </tr>
                <tr>
                  <td className={style.data}>{item.code}</td>
                </tr>
                <tr>
                  <td className={style.data}>{item.name}</td>
                </tr>
                <tr>
                  <td className={style.group}>Group {item.groupnumber}</td>
                </tr>

              </table>

              {sessions.length > index + 1 && <hr className={style.line}/>}
            </div>
          ))}
          </tbody>
        </table>
      </div>
    </li>
  );
};

const { array, string, bool } = React.PropTypes;

TimetableGridCardComponent.propTypes = {
  sessions: array.isRequired,
  day: string.isRequired,
  hideDay: bool.isRequired,
};

export default TimetableGridCardComponent;
