import React, { PropTypes, Component } from 'react';
import style from './style.css';
import ModuleListForm from 'app/containers/ModuleListForm';

const { func, string, bool, array } = PropTypes;

export default class DashBoardComponent extends Component {
  static propTypes = {
    getUserID: func.isRequired,
    login: func.isRequired,
    userID: string.isRequired,
    loading: bool.isRequired,
    checkClash: func.isRequired,
    clash: bool.isRequired,
    checkClashLoading: bool.isRequired,
    newTimetable: array,
    newModules: array,
    modules: array,
    moduleTimetables: array,
  };

  componentWillMount() {
    if (!this.props.getUserID.length) this.props.getUserID();
    this.props.login();
  }

  render() {
    const {
      modules,
      userID,
      loading,
      checkClashLoading,
      clash,
      newModules,
      newTimetable,
      moduleTimetables,
    } = this.props;
    return !loading && (
      <div className={style.mainContainer}>
        <div>
          <span className={style.four}>Welcome {userID}</span>
        </div>
        <ModuleListForm
          modules={modules}
          newModules={newModules}
          newTimetable={newTimetable}
          moduleTimetables={moduleTimetables}
        />
        {!checkClashLoading && !clash &&
          <span>Invalid Selection, Please try again </span>
        }
        {!checkClashLoading && clash &&
          <span>Valid Selection</span>
        }
      </div>
    );
  }
}
