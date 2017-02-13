import React, { PropTypes, Component } from 'react';
import style from './style.css';
import ModuleListForm from 'app/containers/ModuleListForm';
import Loading from 'react-loading';
import classnames from 'classnames';
import TimetableGrid from 'app/components/TimetableGrid';


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
      firstClash,
      amendment,
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
        <ModuleListForm
          modules={oldModules}
          newModules={newModules}
          newTimetable={newTimetable}
          moduleTimetables={moduleTimetables}
        />
        {firstClash && !checkClashLoading && !clash &&
          <span>Invalid Selection, Please try again </span>
        }
        {firstClash && !checkClashLoading && clash &&
          <span>Valid Selection</span>
        }
        { checkClashLoading &&
          <div className={style.loading}>
            <Loading type="spinningBubbles" color="#4500c0" />
          </div>
        }
        {newTimetable &&
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
