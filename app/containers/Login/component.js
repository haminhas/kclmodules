import React from 'react';
import SmallContainer from 'app/components/SmallContainer';

import style from './style.css';

const Login = () => (
  <SmallContainer>
    <a className={style.button} href="http://localhost:3000/auth">Log In</a>
  </SmallContainer>
);

export default Login;
