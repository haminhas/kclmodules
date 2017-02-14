import React, { PropTypes, Component } from 'react';
import ModuleList from 'app/components/ModuleList';
import style from './style.css';
import classnames from 'classnames';

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

  render() {
    const {
      newModules,
      moduleTimetables,
      moduleOnChange,
      oldModules,
      checkClash,
      modulesInvalid,
    } = this.props;

    const buttonStyle = classnames(style.button, {
      [style.invalid]: modulesInvalid,
    });

    const handleClash = () => {
      const newModule = newModules.filter((x) => x.checked === true);
      const oldModule = oldModules.filter((x) => x.checked === true);
      checkClash({newModule, oldModule});
    };

    return (
      <div className={style.modulesContainer}>
        <div>
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
        <button
          type="submit"
          disabled={modulesInvalid}
          className={buttonStyle}
          onClick={handleClash}
        >Check Validity</button>
      </div>
    );
  }
}
