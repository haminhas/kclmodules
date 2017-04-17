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

  constructor(props) {
    super(props);

    this.state = {
      value: '',
    };
  }

  toggleChecked = (event) => {
    this.props.specOnChange(event.value);
    this.setState({
      value: event.value,
    });
  };

  render() {
    const { specialisation } = this.props;

    const spec = [...specialisation, {value: '', label: 'Please choose a specialisation'}];
    return (
      <div className={style.container}>
        <Select
          value={this.state.value}
          placeholder="Please choose a specialisation"
          name="form-field-name"
          options={spec}
          onChange={this.toggleChecked}
        />
      </div>
    );
  }
}
