import React from 'react';

import style from './style.css';


const FourOFour = () => (
  <div className={style.errorContainer}>
    <div>
      <span className={style.four}>4</span>
      <span className={style.four}>0</span>
      <span className={style.four}>4</span>
    </div>
    <div className={style.subtitle}>Page Not Found</div>
    <div className={style.mainText}>Please refresh and try again</div>
  </div>
);

export default FourOFour;
