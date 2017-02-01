import React, { PropTypes } from 'react';
import { Link } from 'react-router';

import Div from 'app/components/Div';

import style from './style.css';
import iconURL from 'app/assets/ic-person.svg';
let url = '';

const AccountWidget = props => {
  const wrapperProps = {
    className: style.accountWidget,
  };
  const Wrapper = props.isLoggedIn ? Div : Link;
  let text;

  if (!props.isLoggedIn) {
    url = `${process.env.API_GATEWAY_URL}/auth`;
    text = 'Login';
  } else if (props.isLoggedIn) {
    url = `${process.env.API_GATEWAY_URL}/logout`;
    wrapperProps.onClick = props.logout;
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
};

const { bool, func } = PropTypes;

AccountWidget.propTypes = {
  isLoggedIn: bool.isRequired,
  logout: func.isRequired,
};

export default AccountWidget;
