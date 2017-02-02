import React, { PropTypes, Component } from 'react';
import classnames from 'classnames';
import ModuleCard from 'app/components/ModuleCard';

import style from './style.css';

import plusIcon from 'app/assets/ic-plus.svg';
import minusIcon from 'app/assets/ic-minus.svg';
const { bool, string, node } = PropTypes;

export default class ExpandablePanel extends Component {
  static propTypes = {
    children: node.isRequired,
    expanded: bool,
    moduleCode: string.isRequired,
    name: string.isRequired,
    fieldDisabled: bool.isRequired,
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
    const { children, moduleCode, name, fieldDisabled } = this.props;
    const { expanded } = this.state;
    const className = classnames(style.expandablePanel, {
      [style.expanded]: expanded,
    });
    return (
      <div className={className}>
        <div onClick={() => this.toggleView()} className={style.button}>
          <ModuleCard
            moduleCode={moduleCode}
            name={name}
            fieldDisabled={fieldDisabled}
          />
        <div className={style.buttonIcon}>View Timetable</div>
        </div>
        {expanded ? <div className={style.container}>{children}</div> : null}
      </div>
    );
  }
}
