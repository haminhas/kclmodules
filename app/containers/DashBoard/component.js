import React, { PropTypes, Component } from 'react';
import style from './style.css';
import ModuleListForm from 'app/containers/ModuleListForm';
import Loading from 'react-loading';
import classnames from 'classnames';
import TimetableGrid from 'app/components/TimetableGrid';
import ExpandablePanel from 'app/components/ExpandablePanel';
import SpecList from 'app/components/SpecList';

const { func, string, bool, array } = PropTypes;

export default class DashBoardComponent extends Component {
  static propTypes = {
    getUserID: func.isRequired,
    userID: string.isRequired,
    loading: bool.isRequired,
    checkClash: func.isRequired,
    clash: bool.isRequired,
    checkClashLoading: bool.isRequired,
    firstClash: bool.isRequired,
    newTimetable: array,
    newModules: array,
    oldModules: array,
    moduleTimetables: array,
    amendment: func.isRequired,
    specialisation: array,
    specOnChange: func.isRequired,
  };

  componentWillMount() {
    this.props.getUserID();
  }

  render() {
    const {
      oldModules,
      userID,
      loading,
      checkClashLoading,
      clash,
      newModules,
      newTimetable,
      moduleTimetables,
      amendment,
      specialisation,
      specOnChange
    } = this.props;

    const mainStyle = classnames(
      {
        [style.dashBoardContainer]: !checkClashLoading,
      }, {
        [style.mainLoading]: checkClashLoading,
      });

    return !loading && (
      <div className={mainStyle}>
        <div className={style.name}>
          <span className={style.four}>Welcome {userID}</span>
        </div>

        { specialisation && <ExpandablePanel label="View Specialisation">
            <span>Specialisation</span>
            <SpecList specialisation={specialisation} specOnChange={specOnChange}/>
          </ExpandablePanel>
        }

        <ModuleListForm
          modules={oldModules}
          newModules={newModules}
          newTimetable={newTimetable}
          moduleTimetables={moduleTimetables}
        />
        { checkClashLoading &&
          <div className={style.loading}>
            <Loading type="spinningBubbles" color="#4500c0" />
          </div>
        }
        { newTimetable && clash &&
          <div className={style.timeGrid}>
            <TimetableGrid timetable={newTimetable} amend={amendment} clash={clash}/>
          </div>
        }
      </div>
    ) || (
      <div className={style.loading}>
        <Loading type="spinningBubbles" color="#4500c0" />
      </div>
    );
  }
}
