import React from 'react';
import SmallContainer from 'app/components/SmallContainer';

import style from './style.css';
const { API_GATEWAY_URL } = process.env;
const url = `${API_GATEWAY_URL}/auth`;
const Login = () => (
  <SmallContainer>
    <a className={style.button} href={url}>Log In</a>
  </SmallContainer>
);

export default Login;
