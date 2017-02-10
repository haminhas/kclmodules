import React, { PropTypes, Component } from 'react';
import style from './style.css';
const { string } = React.PropTypes;

export default class TimetableGridRow extends Component {
  static propTypes = {
    day: string.isRequired,
  };
  // for (const obj of sessions) {
  //   obj.index = Number(obj.starttime.slice(0, -6) % 8);
  // }
  // <tr>
  //   <td>{day}</td>
  //   {[...Array(8)].map((x, i) =>
  //     sessions.map((item) => (
  //       (item.index !== i) && <td className={style.hide}>{i}</td> || <td>{item.name}</td>
  //     )
  //   ))}
  // </tr>
  render() {
    const { day } = this.props;
    return (
    <tr>
      <td>{day}</td>
      {[...Array(11)].map((x, i) =>
        <td id={i}>
          <div ref={i}/>
        </td>
      )}
    </tr>

    );
  }
}
