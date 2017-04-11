import React, { PropTypes, Component } from 'react';
import Select from 'react-select';
import style from './style';
import 'react-select/dist/react-select.css';
import { Bar } from 'react-chartjs-2';

const { arrayOf, shape, string, number, func, bool, object } = PropTypes;

export default class AdminComponent extends Component {
  static propTypes = {
    programmes: arrayOf(shape({
      value: number.isRequired,
      label: string.isRequired,
    })).isRequired,
    loading: bool.isRequired,
    getProgrammes: func.isRequired,
    programmesOnChange: func.isRequired,
    newData: object.isRequired,
    oldData: object.isRequired
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

  toggleChecked = (event) => {
    this.props.programmesOnChange(event.value);
    this.setState({
      value: event.value,
    });
  };

  render() {
    const { loading, programmes, newData, oldData } = this.props;
    const options = {
    	responsive: true,
    	scales: {
    		  xAxes: [{
        stacked: true,
        scaleLabel: {
          display: true,
          labelString: 'Modules'
        }
      }],

      	yAxes: [{
         		stacked: true,
        		ticks: {
              	beginAtZero: true
          	},
        scaleLabel: {
          display: true,
          labelString: '% of students'
        }}]
    	}
	  };

    return !loading && (
      <div className={style.container}>
        <Select
          value={this.state.value}
          placeholder="Please choose a programme"
          options={programmes}
          clearable={false}
          onChange={this.toggleChecked}
        />

        {this.state.value > 0 && newData && <Bar data={newData} options={options} />}
        {this.state.value > 0 && oldData && <Bar data={oldData} options={options} />}

      </div>
    );
  }
}
