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
    compulsoryClash: func.isRequired,
  };

  static contextTypes = {
    redux: React.PropTypes.object
  }

  componentDidUpdate(prevProps) {
    const {
      oldModules,
      newModules,
    } = this.props;

    if (
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
      compulsoryClash
    } = this.props;
    const newModule = newModules.filter((x) => x.checked === true);
    const oldModule = oldModules.filter((x) => x.checked === true);
    const compulsoryNew = newModule.filter((x) => x.compulsory === true);
    const compulsoryOld = oldModule.filter((x) => x.compulsory === true);

    if (compulsoryNew.length !== compulsoryOld.length ) {
      return compulsoryClash('Please select equal amount of compulsory modules');
    } else if (newModule.length !== oldModule.length && (newModule.length > 0 && oldModule.length > 0)) {
      return compulsoryClash('Please select equal amount of modules');
    }

    if (newModule.length === oldModule.length && newModule.length > 0 && oldModule.length > 0) {
      return checkClash({newModule, oldModule});
    }

    return null;
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
