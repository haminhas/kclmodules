import React, { PropTypes } from 'react';
//import { Link } from 'react-router';

import style from './style.css';
//import { LOGIN } from 'app/containers/Router/routes';
//import AccountWidget from 'app/containers/AccountWidget';

//import logo from 'app/assets/logo.svg';

const Navbar = props => (
  <div className={style.navbar}>
    <div className={style.container}>
    </div>
  </div>
);

const { string } = PropTypes;

Navbar.propTypes = {
  path: string,
};

export default Navbar;
