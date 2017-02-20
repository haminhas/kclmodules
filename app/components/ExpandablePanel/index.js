import React, { PropTypes, Component } from 'react';
import classnames from 'classnames';
import style from './style.css';

const { bool, node, string, func } = PropTypes;

export default class ExpandablePanel extends Component {
  static propTypes = {
    children: node.isRequired,
    expanded: bool,
    label: string.isRequired,
    onChange: func,
    executeOnChange: bool.isRequired,
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
    this.props.executeOnChange && this.props.onChange(!this.state.expanded);
  };

  render() {
    const { children, label } = this.props;
    const { expanded } = this.state;
    const className = classnames(style.expandablePanel, {
      [style.expanded]: expanded,
    });
    return (
      <div className={className}>
        <div className={style.button}>
          {children[0]}
        <div className={style.buttonIcon} onClick={() => this.toggleView()}>{label}</div>
        </div>
        {expanded ? <div className={style.container}>{children[1]}</div> : null}
      </div>
    );
  }
}
