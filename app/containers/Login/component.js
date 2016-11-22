import React from 'react';
import SmallContainer from 'app/components/SmallContainer';
import { browserHistory } from 'react-router';

import style from './style.css';

const Login = () => (
  <SmallContainer>
    <a className={style.button} href="http://localhost:3000/auth">Log In</a>
    <div onClick={() => browserHistory.push('/dashboard')}>DashBoard</div>
  </SmallContainer>
);

export default Login;
