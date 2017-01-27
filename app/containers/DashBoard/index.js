import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import DashBoardComponent from './component';
import { getUserID } from './actions';
import { login } from 'app/containers/AccountWidget/actions';

const mapStateToProps = state => ({
  userID: state.dashBoard.userID,
  modules: state.dashBoard.modules,
  loading: state.dashBoard.loading,
});

const mapDispatchToProps = dispatch => bindActionCreators({
  getUserID,
  login,
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(DashBoardComponent);
