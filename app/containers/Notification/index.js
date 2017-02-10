import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import NotificationBar from './component';
import { dismissNotification } from './actions';

const mapStateToProps = state => ({
  notification: state.notification,
});

const mapDispatchToProps = dispatch => bindActionCreators({
  dismissNotification,
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(NotificationBar);
