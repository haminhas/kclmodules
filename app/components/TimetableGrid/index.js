import React, { PropTypes, Component } from 'react';
import TimetableGridCard from 'app/components/TimetableGridCard';
import classnames from 'classnames';
import Media from 'react-media';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';

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

    const True = true;
    const False = false;

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

              <TabPanel>
                <div className={style.cardContianer}>
                  <TimetableGridCard hideDay={True} day="Monday" sessions={timetable.filter((x) => x.day.toLowerCase() === 'mon')}/>
                </div>
              </TabPanel>
              <TabPanel>
                <div className={style.cardContianer}>
                  <TimetableGridCard hideDay={True} day="Tuesday" sessions={timetable.filter((x) => x.day.toLowerCase() === 'tue')}/>
                </div>
              </TabPanel>
              <TabPanel>
                <div className={style.cardContianer}>
                  <TimetableGridCard hideDay={True} day="Wednesday" sessions={timetable.filter((x) => x.day.toLowerCase() === 'wed')}/>
                </div>
              </TabPanel>
              <TabPanel>
                <div className={style.cardContianer}>
                  <TimetableGridCard hideDay={True} day="Thursday" sessions={timetable.filter((x) => x.day.toLowerCase() === 'thu')}/>
                </div>
              </TabPanel>
              <TabPanel>
                <div className={style.cardContianer}>
                  <TimetableGridCard hideDay={True} day="Friday" sessions={timetable.filter((x) => x.day.toLowerCase() === 'fri')}/>
                </div>
              </TabPanel>
            </Tabs>
          ) : (
            <div className={style.timetable}>
              <ul>
                <div className={style.cardContianer}>
                  <TimetableGridCard day="Monday" hideDay={False} sessions={timetable.filter((x) => x.day.toLowerCase() === 'mon')}/>
                </div>
                <div className={style.cardContianer}>
                  <TimetableGridCard day="Tuesday" hideDay={False} sessions={timetable.filter((x) => x.day.toLowerCase() === 'tue')}/>
                </div>
                <div className={style.cardContianer}>
                  <TimetableGridCard day="Wednesday" hideDay={False} sessions={timetable.filter((x) => x.day.toLowerCase() === 'wed')}/>
                </div>
                <div className={style.cardContianer}>
                  <TimetableGridCard day="Thursday" hideDay={False} sessions={timetable.filter((x) => x.day.toLowerCase() === 'thu')}/>
                </div>
                <div className={style.cardContianer}>
                  <TimetableGridCard day="Friday" hideDay={False} sessions={timetable.filter((x) => x.day.toLowerCase() === 'fri')}/>
                </div>
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
