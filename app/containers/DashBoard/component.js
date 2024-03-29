/* eslint-disable react/jsx-boolean-value */

import React, { PropTypes, Component } from 'react';
import style from './style.css';
import ModuleListForm from 'app/containers/ModuleListForm';
import Loading from 'react-loading';
import classnames from 'classnames';
import TimetableGrid from 'app/containers/TimetableGrid';
import SpecList from 'app/containers/SpecList';
import Admin from 'app/containers/Admin';

const { func, string, bool, array } = PropTypes;

export default class DashBoardComponent extends Component {
  static propTypes = {
    getUserID: func.isRequired,
    userID: string.isRequired,
    loading: bool.isRequired,
    clash: bool.isRequired,
    checkClashLoading: bool.isRequired,
    firstClash: bool.isRequired,
    newTimetable: array,
    specialisation: array,
    isAdmin: bool.isRequired,
  };

  componentWillMount() {
    this.props.getUserID();
  }

  render() {
    const {
      userID,
      loading,
      checkClashLoading,
      clash,
      newTimetable,
      specialisation,
      isAdmin,
    } = this.props;

    const mainStyle = classnames(
      {
        [style.dashBoardContainer]: !checkClashLoading,
      }, {
        [style.mainLoading]: checkClashLoading,
      });

    return !isAdmin && (!loading && (
      <div className={mainStyle}>
        <div className={style.name}>
          <span className={style.four}>Welcome {userID}</span>
        </div>

        { specialisation &&
          <div className={style.specContainer}>
              <SpecList />
          </div>
        }

        <ModuleListForm />

        { checkClashLoading &&
          <div className={style.loading}>
            <Loading type="spinningBubbles" color="#4500c0" />
          </div>
        }
        { newTimetable && clash &&
          <div className={style.timeGrid}>
            <TimetableGrid clash={clash}/>
          </div>
        }
      </div>
    ) || (
      <div className={style.loading}>
        <Loading type="spinningBubbles" color="#4500c0" />
      </div>
    )) || (
      <div>
        Admin View
        <Admin />
      </div>
    );
  }
}
