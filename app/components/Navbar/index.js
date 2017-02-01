import React from 'react';
import AccountWidget from 'app/containers/AccountWidget';

import style from './style.css';

// import logo from 'app/assets/logo.svg';

const Navbar = () => (
  <div className={style.navbar}>
    <div className={style.container} >
      <div className={style.rightSide}>
        <AccountWidget />
      </div>
    </div>
  </div>
);

export default Navbar;
