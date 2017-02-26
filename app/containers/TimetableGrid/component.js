import React, { PropTypes, Component } from 'react';
import TimetableGridCard from 'app/components/TimetableGridCard';
import classnames from 'classnames';
import Media from 'react-media';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';

import style from './style.css';
const { array, func, bool } = PropTypes;

export default class TimetableGridComponent extends Component {
  static propTypes = {
    timetable: array,
    amendment: func.isRequired,
    clash: bool.isRequired,
  };

  render() {
    const { timetable, clash, amendment } = this.props;
    const colors = ['#f44336', '#2196f3', '#4caf50', '#ff9800', '#6d4c41', '#9c27b0'];
    [...new Set(timetable.map((item) => item.code))].map((item, index) => {
      timetable.filter((x) => x.code === item).map((y) => (y.color = colors[index]));
    });

    const buttonStyle = classnames(style.button, {
      [style.invalid]: !clash,
    });

    const handleSubmit = () => {
      amendment(timetable);
    };

    const True = true;
    const False = false;
    const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];
    const smallDays = ['mon', 'tue', 'wed', 'thu', 'fri'];

    console.log(days);
    return (
      <div className={style.timetableGridContainer}>
      <Media query="(max-width: 750px)">
          {matches => matches ? (
            <Tabs>
              <TabList>
                <Tab>Mon</Tab>
                <Tab>Tue</Tab>
                <Tab>Wed</Tab>
                <Tab>Thu</Tab>
                <Tab>Fri</Tab>
              </TabList>

              { days.map((item, index) => (
                <TabPanel key={index}>
                  <div className={style.cardContianer}>
                    <TimetableGridCard hideDay={True} day={item} sessions={timetable.filter((x) => x.day.toLowerCase() === smallDays[index])}/>
                  </div>
                </TabPanel>
              ))}
            </Tabs>
          ) : (
            <div className={style.timetable}>
              <ul>
                { days.map((item, index) => (
                  <div key={index} className={style.cardContianer}>
                    <TimetableGridCard day={item} hideDay={False} sessions={timetable.filter((x) => x.day.toLowerCase() === smallDays[index])}/>
                  </div>
                ))}
              </ul>
            </div>
          )}
        </Media>
        <div>
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
