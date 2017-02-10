import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import DashBoardComponent from './component';
import { getUserID, checkClash } from './actions';
import { login } from 'app/containers/AccountWidget/actions';

const mapStateToProps = state => ({
  userID: state.dashBoard.userID,
  modules: state.dashBoard.modules,
  loading: state.dashBoard.loading,
  newModules: state.dashBoard.newModules,
  clash: state.dashBoard.checkClash,
  firstClash: state.dashBoard.firstClash,
  checkClashLoading: state.dashBoard.checkClashLoading,
  moduleTimetables: state.dashBoard.moduleTimetables,
  newTimetable: state.dashBoard.newTimetable,
});

const mapDispatchToProps = dispatch => bindActionCreators({
  getUserID,
  login,
  checkClash,
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(DashBoardComponent);
