import React, { PropTypes, Component } from 'react';
import classnames from 'classnames';
import style from './style.css';
import plusIcon from 'app/assets/ic-plus.svg';
import minusIcon from 'app/assets/ic-minus.svg';

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
    let { children, label } = this.props;
    const { expanded } = this.state;
    const className = classnames(style.expandablePanel, {
      [style.expanded]: expanded,
      [style.checked]: children[0].props.checked,
    });

    const newlabel = (
      <img
        src={expanded ? minusIcon : plusIcon}
        alt={expanded ? '-' : '+'}
      />
    );
    if (!label) {
      label = newlabel;
    }
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
