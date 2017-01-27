import React, { PropTypes, Component } from 'react';
import style from './style.css';
import ModuleList from 'app/components/ModuleList';
const { func, string, array, bool } = PropTypes;

export default class DashBoardComponent extends Component {
  static propTypes = {
    getUserID: func.isRequired,
    login: func.isRequired,
    userID: string.isRequired,
    modules: array.isRequired,
    loading: bool.isRequired,
  };

  componentWillMount() {
    if (!this.props.getUserID.length) this.props.getUserID();
    this.props.login();
  }

  render() {
    const { userID, modules, loading } = this.props;
    console.log(loading);
    return !loading && (
      <div className={style.mainContainer}>
        <div>
          <span className={style.four}>Welcome {userID}</span>
        </div>
        <ModuleList modules={modules}/>
      </div>
    );
  }
}
