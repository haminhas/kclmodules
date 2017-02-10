import React, { PropTypes, Component } from 'react';
import classnames from 'classnames';
import ModuleCard from 'app/components/ModuleCard';

import style from './style.css';

const { bool, string, node, func } = PropTypes;

export default class ExpandablePanel extends Component {
  static propTypes = {
    children: node.isRequired,
    expanded: bool,
    moduleCode: string.isRequired,
    name: string.isRequired,
    fieldDisabled: bool,
    moduleOnChange: func.isRequired,
  };

  constructor(props) {
    super(props);

    this.state = {
      expanded: false,
    };
  }

  componentWillMount() {
    this.setState({
      expanded: this.props.expanded,
    });
  }

  componentWillReceiveProps(nextProps) {
    if (this.state.expanded !== nextProps.expanded) {
      this.setState({
        expanded: nextProps.expanded,
      });
    }
  }

  toggleView = () => {
    this.setState({
      expanded: !this.state.expanded,
    });
  };

  render() {
    const { children, moduleCode, name, fieldDisabled, moduleOnChange } = this.props;
    const { expanded } = this.state;
    const className = classnames(style.expandablePanel, {
      [style.expanded]: expanded,
    });
    return (
      <div className={className}>
        <div className={style.button}>
          <ModuleCard
            moduleCode={moduleCode}
            name={name}
            fieldDisabled={fieldDisabled}
            moduleOnChange={moduleOnChange}
          />
        <div className={style.buttonIcon} onClick={() => this.toggleView()}>View Timetable</div>
        </div>
        {expanded ? <div className={style.container}>{children}</div> : null}
      </div>
    );
  }
}
