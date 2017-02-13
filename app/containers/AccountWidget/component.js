import React, { PropTypes, Component } from 'react';
import { Link } from 'react-router';
import Div from 'app/components/Div';
import style from './style.css';
import iconURL from 'app/assets/ic-person.svg';
let url = '';

const { bool, func } = PropTypes;

export default class AccountWidget extends Component {
  static propTypes = {
    isLoggedIn: bool.isRequired,
    logout: func.isRequired,
  };

  render() {
    const { isLoggedIn, logout } = this.props;
    const wrapperProps = {
      className: style.accountWidget,
    };
    const Wrapper = isLoggedIn ? Div : Link;
    let text;

    if (!isLoggedIn) {
      url = `${process.env.API_GATEWAY_URL}/auth`;
      text = 'Login';
    } else if (isLoggedIn) {
      url = `${process.env.API_GATEWAY_URL}/logout`;
      wrapperProps.onClick = logout;
      text = 'Logout';
    }

    return (
    <Wrapper {...wrapperProps}>
      <img
        alt="Profile"
        role="presentation"
        src={iconURL}
        className={style.profileIcon}
      />
      <a href={url}>
        <span className={style.text}>{text}</span>
      </a>
    </Wrapper>
    );
  }
}
