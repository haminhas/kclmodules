import React, { PropTypes, Component } from 'react';
import style from './style.css';

const { func } = PropTypes;
const url = `${process.env.API_GATEWAY_URL}/logout`;

export default class DashBoardComponent extends Component {
  static propTypes = {
    getUserID: func.isRequired,
    login: func.isRequired,
  };

  componentWillMount() {
    this.props.getUserID();
    this.props.login();
  }

  render() {
    return (
      <div className={style.mainContainer}>
        <div>
          <span className={style.four}>Working</span>
          <a className={style.button} href={url}>Log Out</a>
        </div>
      </div>
    );
  }
}
