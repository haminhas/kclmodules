import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import DashBoardComponent from './component';
import { getUserID } from './actions';

const mapStateToProps = state => ({
  userID: state.userID,
});

const mapDispatchToProps = dispatch => bindActionCreators({
  getUserID,
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(DashBoardComponent);
