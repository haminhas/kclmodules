import React, { PropTypes, Component } from 'react';
import Select from 'react-select';
import style from './style';
import 'react-select/dist/react-select.css';
import { Bar } from 'react-chartjs-2';
import { reduxForm } from 'redux-form';
import AddAdminForm from 'app/components/AddAdminForm';
import ExpandablePanel from 'app/components/ExpandablePanel';
import validate from './validate';

const { arrayOf, shape, string, number, func, bool, object } = PropTypes;

const AddAdminFormContainer = reduxForm({
  form: 'addProjectForm',
})(AddAdminForm);

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
    oldData: object.isRequired,
    addAdmin: func.isRequired,
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
    const { loading, programmes, newData, oldData, addAdmin } = this.props;
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
        <div className={style.add}>
          <ExpandablePanel
            executeOnChange={false}
          >
          <div>Add Admins</div>
          <AddAdminFormContainer
            onSubmit={addAdmin}
            validate={values => validate(values)}
          />
          </ExpandablePanel>
        </div>
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
