import React, { PropTypes, Component } from 'react';
import TimetableGridRow from 'app/components/TimetableGridRow';
import style from './style.css';
const { array } = PropTypes;

export default class TimetableGrid extends Component {
  static propTypes = {
    timetable: array,
  };

  constructor() {
    super();
  }

  componentDidMount() {
    const { timetable } = this.props;
    for (const obj of timetable) {
      obj.index = Number(obj.starttime.slice(0, -6) % 8);
      obj.duration = Number(obj.endtime.slice(0, -6)) - Number(obj.starttime.slice(0, -6));
    }
    const sortTimetable = day => {
      return timetable.filter((x) => x.day.toLowerCase() === day);
    };
    const days = ['mon', 'tue', 'wed', 'thu', 'fri'];
    const sorted = [];
    days.forEach((item) => {
      sorted.push(sortTimetable(item));
    });
    const assigner = (data, objects) => {
      for (const key in objects) {
        if (objects.hasOwnProperty(key)) {
          data.map((item1) => {
            if (item1.index === Number(key)) {
              if (item1.duration > 1) {
                objects[Number(key) + (item1.duration - 1)].parentNode.remove();
                objects[key].parentNode.colSpan = item1.duration;
              }
              objects[key].innerHTML = item1.name;
            }
          });
        }
      }
    };
    assigner(sorted[0], this.refs.mon.refs);
    assigner(sorted[1], this.refs.tue.refs);
    assigner(sorted[2], this.refs.wed.refs);
    assigner(sorted[3], this.refs.thu.refs);
    assigner(sorted[4], this.refs.fri.refs);
  }

  render() {
    return (
    <table>
      <tr>
        {[...Array(12)].map((_, i) => (
           (i === 0) && <th className={style.hide}>{i}</th> || <th className={style.headers} key={i}>{i + 7}</th>
        ))}
      </tr>
      <TimetableGridRow day="Mon" ref="mon" />
      <TimetableGridRow day="Tue" ref="tue" />
      <TimetableGridRow day="Wed" ref="wed" />
      <TimetableGridRow day="Thu" ref="thu" />
      <TimetableGridRow day="Fri" ref="fri" />
    </table>
    );
  }
}


// TimetableGridComponent.propTypes = {
//   // timetable: arrayOf(shape({
//   //   code: string.isRequired,
//   //   day: string.isRequired,
//   //   name: string.isRequired,
//   //   startTime: string.isRequired,
//   //   endTime: string.isRequired,
//   //   groupNumber: integer.isRequired,
//   //   id: integer.isRequired,
//   //   capacity: integer.isRequired,
//   // })),
//   timetable: array,
// };
