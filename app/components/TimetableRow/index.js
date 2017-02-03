import React from 'react';
import style from './style.css';

const TimetableRowComponent = props => {
  const { item1, item2 } = props;
  return (
    <div>
      <tr>
        <td className={style.row1}>{item1.slice(0, -3)}</td>
        <td className={style.row}>{item2}</td>
      </tr>
    </div>
  );
};

const { string } = React.PropTypes;

TimetableRowComponent.propTypes = {
  item1: string.isRequired,
  item2: string.isRequired,
};

export default TimetableRowComponent;
