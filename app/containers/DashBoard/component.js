import React, { PropTypes, Component } from 'react';
import style from './style.css';
import ModuleListForm from 'app/containers/ModuleListForm';
import { reduxForm } from 'redux-form';

const { func, string, bool, array } = PropTypes;

const ModuleListFormContainer = reduxForm({
  form: 'ModuleListForm',
})(ModuleListForm);


export default class DashBoardComponent extends Component {
  static propTypes = {
    getUserID: func.isRequired,
    login: func.isRequired,
    userID: string.isRequired,
    loading: bool.isRequired,
    checkClash: func.isRequired,
    clash: bool.isRequired,
    checkClashLoading: bool.isRequired,
    newTimetable: array.isRequired,
  };

  componentWillMount() {
    if (!this.props.getUserID.length) this.props.getUserID();
    this.props.login();
  }

  render() {
    const {
      userID,
      loading,
      checkClash,
      checkClashLoading,
      clash,
      newTimetable,
    } = this.props;
    return !loading && (
      <div className={style.mainContainer}>
        <div>
          <span className={style.four}>Welcome {userID}</span>
        </div>
        <ModuleListFormContainer
          onSubmit={checkClash}
          newTimetable={newTimetable}
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
