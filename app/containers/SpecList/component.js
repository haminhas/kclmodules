import React, { PropTypes, Component } from 'react';
import Select from 'react-select';
import style from './style';
import 'react-select/dist/react-select.css';
const { arrayOf, shape, string, number, func } = PropTypes;

export default class SpecListComponent extends Component {
  static propTypes = {
    specialisation: arrayOf(shape({
      value: number.isRequired,
      label: string.isRequired,
    })).isRequired,
    specOnChange: func.isRequired,
  };

  render() {
    const { specialisation, specOnChange } = this.props;

    const toggleChecked = (event) => {
      specOnChange(event.value);
    };
    const spec = [...specialisation, {value: '', label: 'None'}];
    return (
      <div className={style.container}>
        <Select
          placeholder="Please choose a specialisation"
          name="form-field-name"
          options={spec}
          onChange={toggleChecked}
        />
      </div>
    );
  }
}
