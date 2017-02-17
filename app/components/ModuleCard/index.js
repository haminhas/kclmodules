import React, { PropTypes, Component } from 'react';
import style from './style';

const { func, string, bool} = PropTypes;

export default class ModuleListCardComponent extends Component {
  static propTypes = {
    moduleCode: string.isRequired,
    name: string.isRequired,
    fieldDisabled: bool,
    checked: bool,
    moduleOnChange: func.isRequired,
  };

  state = {
    checked: false,
  };

  toggleChecked = () => {
    this.setState(({ checked }) => ({
      checked: !checked,
    }));
    this.props.moduleOnChange(
      this.props.name,
      this.props.moduleCode,
      !this.state.checked
    );
  };

  render() {
    const { checked } = this.state;
    const { moduleCode, fieldDisabled } = this.props;

    return (
      <div className={style.fieldContainer}>
      { fieldDisabled &&
        <p className={style.disabled}>{moduleCode} <span className={style.compulsory}>- Compulsory</span> </p>
        ||
        <label>
          <input
            className={style.field}
            type="checkbox"
            checked={checked}
            onChange={this.toggleChecked}
            disabled={fieldDisabled}
          />
          <div className={style.code}>{moduleCode}</div>
        </label>
      }
      </div>
    );
  }
}
