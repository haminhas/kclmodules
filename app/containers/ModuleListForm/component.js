import React, { PropTypes, Component } from 'react';
import ModuleList from 'app/components/ModuleList';
import style from './style.css';

const { string, array, arrayOf, shape, func, bool } = PropTypes;

export default class ModuleListFormComponent extends Component {
  static propTypes = {
    oldModules: arrayOf(shape({
      code: string.isRequired,
    })).isRequired,
    newModules: arrayOf(shape({
      code: string.isRequired,
    })).isRequired,
    moduleTimetables: array,
    newTimetable: array,
    checkClash: func.isRequired,
    moduleOnChange: func.isRequired,
    modulesInvalid: bool.isRequired,
  };

  static contextTypes = {
    redux: React.PropTypes.object
  }

  componentDidUpdate(prevProps) {
    const {
      modulesInvalid,
      oldModules,
      newModules,
    } = this.props;

    if (!modulesInvalid &&
       (oldModules !== prevProps.oldModules ||
        newModules !== prevProps.newModules)
      ) {
      this.handleClash();
    }
  }

  handleClash() {
    const {
      newModules,
      oldModules,
      checkClash,
    } = this.props;
    const newModule = newModules.filter((x) => x.checked === true);
    const oldModule = oldModules.filter((x) => x.checked === true);
    checkClash({newModule, oldModule});
  }

  render() {
    const {
      newModules,
      moduleTimetables,
      moduleOnChange,
      oldModules,
    } = this.props;

    return (
      <div className={style.modulesContainer}>
        <div className={style.modulesInnerContainer}>
          <div className={style.left}>
            <ModuleList
              title="Current Modules"
              modules={oldModules}
              name="oldModules"
              moduleTimetables={moduleTimetables}
              moduleOnChange={moduleOnChange}
            />
          </div>
          <div className={style.right}>
            <ModuleList
              title="New Modules"
              modules={newModules}
              name="newModules"
              moduleTimetables={moduleTimetables}
              moduleOnChange={moduleOnChange}
            />
          </div>
        </div>
      </div>
    );
  }
}
