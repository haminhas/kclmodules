import React, { PropTypes, Component } from 'react';
import style from './style.css';
import ModuleList from 'app/components/ModuleList';
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
  };

  componentWillMount() {
    if (!this.props.getUserID.length) this.props.getUserID();
    this.props.login();
  }

  render() {
    const { userID, modules, loading, newModules, getUserID } = this.props;
    console.log(loading);
    return !loading && (
      <div className={style.mainContainer}>
        <div>
          <span className={style.four}>Welcome {userID}</span>
        </div>
        <ModuleListFormContainer
          modules={modules}
          newModules={newModules}
          onSubmit={getUserID}
          otherSubmit={getUserID}
        />
      </div>
    );
  }
}
