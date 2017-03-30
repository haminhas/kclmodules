import React, { PropTypes, Component } from 'react';
import Select from 'react-select';
import style from './style';
import 'react-select/dist/react-select.css';
const { arrayOf, shape, string, number, func, bool } = PropTypes;

export default class AdminComponent extends Component {
  static propTypes = {
    programmes: arrayOf(shape({
      value: number.isRequired,
      label: string.isRequired,
    })).isRequired,
    loading: bool.isRequired,
    getProgrammes: func.isRequired,
    programmesOnChange: func.isRequired,
  };

  constructor(props) {
    super(props);

    this.state = {
      value: '',
    };
  }

  componentWillMount() {
    this.props.getProgrammes();
  }

  render() {
    const { loading, programmes, programmesOnChange } = this.props;

    const toggleChecked = (event) => {
      programmesOnChange(event.value);
      this.setState({
        value: event.value,
      });
    };

    return !loading && (
      <div className={style.container}>
        <Select
          value={this.state.value}
          placeholder="Please choose a programme"
          name="form-field-name"
          options={programmes}
          clearable={false}
          onChange={toggleChecked}
        />
      </div>
    );
  }
}
