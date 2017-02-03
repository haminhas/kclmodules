import React, { PropTypes, Component } from 'react';
import Form from 'app/components/Form';
import ModuleList from 'app/components/ModuleList';
import style from './style';
import classnames from 'classnames';

const { func, string, array, arrayOf, shape} = PropTypes;

export default class ModuleListFormComponent extends Component {
  static propTypes = {
    onSubmit: func.isRequired,
    modules: arrayOf(shape({
      code: string.isRequired,
    })).isRequired,
    newModules: arrayOf(shape({
      code: string.isRequired,
    })).isRequired,
    moduleTimetables: array.isRequired,
    newTimetable: array.isRequired,
    amendment: func.isRequired,
  };

  render() {
    const {
      modules,
      newModules,
      moduleTimetables,
    } = this.props;

    return (
      <Form {...this.props} buttonText="Check Clash" otherText="Amend">
        <ModuleList
          title="Current Modules"
          modules={modules}
          name="oldModules"
          moduleTimetables={moduleTimetables}
        />
        <ModuleList
          title="New Modules"
          modules={newModules}
          name="newModules"
          moduleTimetables={moduleTimetables}
        />
      </Form>
    );
  }
}
