import React from 'react';
import SmallContainer from 'app/components/SmallContainer';

import style from './style.css';
const url = `${process.env.API_GATEWAY_URL}/auth`;
const Login = () => (
  <SmallContainer>
    <a className={style.button} href={url}>Log In Via KCL</a>
  </SmallContainer>
);

export default Login;
