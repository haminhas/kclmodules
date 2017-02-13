import React, { PropTypes, Component } from 'react';
import TimetableGridCard from 'app/components/TimetableGridCard';
import classnames from 'classnames';

import style from './style.css';
const { array, func, bool } = PropTypes;

export default class TimetableGrid extends Component {
  static propTypes = {
    timetable: array,
    amend: func.isRequired,
    clash: bool.isRequired,
  };

  constructor() {
    super();
  }


  render() {
    const { timetable, clash, amend } = this.props;
    const colors = ['#f44336', '#2196f3', '#4caf50', '#ff9800', '#6d4c41', '#9c27b0'];
    [...new Set(timetable.map((item) => item.code))].map((item, index) => {
      timetable.filter((x) => x.code === item).map((y) => y.color = colors[index]);
    });

    const buttonStyle = classnames(style.button, {
      [style.invalid]: !clash,
    });

    const handleSubmit = () => {
      amend(timetable);
    };

    return (
      <div className={style.timetableGridContainer}>
        <div className={style.timetable}>
          <ul>
            <div className={style.cardContianer}>
              <TimetableGridCard day="Monday" sessions={timetable.filter((x) => x.day === 'Mon')}/>
            </div>
            <div className={style.cardContianer}>
              <TimetableGridCard day="Tuesday" sessions={timetable.filter((x) => x.day === 'Tue')}/>
            </div>
            <div className={style.cardContianer}>
              <TimetableGridCard day="Wednesday" sessions={timetable.filter((x) => x.day === 'Wed')}/>
            </div>
            <div className={style.cardContianer}>
              <TimetableGridCard day="Thursday" sessions={timetable.filter((x) => x.day === 'Thu')}/>
            </div>
            <div className={style.cardContianer}>
              <TimetableGridCard day="Friday" sessions={timetable.filter((x) => x.day === 'Fri')}/>
            </div>
          </ul>
        </div>
        <div className={style.buttonDiv}>
        <button
          type="submit"
          disabled={!clash}
          className={buttonStyle}
          onClick={handleSubmit}
        >Amend</button>
        </div>
      </div>
    );
  }
}
