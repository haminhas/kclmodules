import React from 'react';
import style from './style.css';
const { API_GATEWAY_URL } = process.env;
const url = `${API_GATEWAY_URL}/logout`;
console.log(url);
const DashBoard = () => (
  <div className={style.mainContainer}>
    <div>
      <span className={style.four}>Working</span>
      <a className={style.button} href={url}>Log Out</a>
    </div>
  </div>
);

export default DashBoard;
