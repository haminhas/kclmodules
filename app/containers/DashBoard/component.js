import React, { PropTypes, Component } from 'react';
import style from './style.css';
import ModuleListForm from 'app/components/ModuleListForm';
import { reduxForm } from 'redux-form';

const { func, string, array, bool } = PropTypes;

const ModuleListFormContainer = reduxForm({
  form: 'ModuleListForm',
})(ModuleListForm);


export default class DashBoardComponent extends Component {
  static propTypes = {
    getUserID: func.isRequired,
    login: func.isRequired,
    userID: string.isRequired,
    modules: array.isRequired,
    newModules: array.isRequired,
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
      modules,
      loading,
      newModules,
      checkClash,
      checkClashLoading,
      clash
    } = this.props;
    return !loading && (
      <div className={style.mainContainer}>
        <div>
          <span className={style.four}>Welcome {userID}</span>
        </div>
        <ModuleListFormContainer
          modules={modules}
          newModules={newModules}
          onSubmit={checkClash}
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
