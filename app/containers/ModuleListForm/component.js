import React, { PropTypes, Component } from 'react';
import ModuleList from 'app/components/ModuleList';
import style from './style.css';
import classnames from 'classnames';

const { string, array, arrayOf, shape, func, bool } = PropTypes;

export default class ModuleListFormComponent extends Component {
  static propTypes = {
    modules: arrayOf(shape({
      code: string.isRequired,
    })).isRequired,
    newModules: arrayOf(shape({
      code: string.isRequired,
    })).isRequired,
    moduleTimetables: array,
    newTimetable: array,
    checkClash: func.isRequired,
    moduleOnChange: func.isRequired,
    loadOldModules: func.isRequired,
    loadNewModules: func.isRequired,
    pristine: bool.isRequired,
    submitting: bool.isRequired,
    invalid: bool.isRequired,
    newFormModules: array,
    oldFormModules: array,
  };

  static contextTypes = {
    redux: React.PropTypes.object
  }

  componentWillMount() {
    this.props.loadOldModules(this.props.modules);
    this.props.loadNewModules(this.props.newModules);
  }

  render() {
    const {
      modules,
      newModules,
      moduleTimetables,
      moduleOnChange,
      pristine,
      submitting,
      invalid,
      newFormModules,
      oldFormModules,
      checkClash,
    } = this.props;

    const buttonStyle = classnames(style.button, {
      [style.invalid]: invalid,
    });

    const handleClash = () => {
      const newFormModule = newFormModules.filter((x) => x.checked === true);
      const oldFormModule = oldFormModules.filter((x) => x.checked === true);
      checkClash({newFormModule, oldFormModule});
    };

    return (
      <div>
        <ModuleList
          title="Current Modules"
          modules={modules}
          name="oldModules"
          moduleTimetables={moduleTimetables}
          moduleOnChange={moduleOnChange}
        />
        <ModuleList
          title="New Modules"
          modules={newModules}
          name="newModules"
          moduleTimetables={moduleTimetables}
          moduleOnChange={moduleOnChange}
        />
        <button
          type="submit"
          disabled={pristine || submitting || invalid}
          className={buttonStyle}
          onClick={handleClash}
        >Check Validity</button>
      </div>
    );
  }
}
