import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import DashBoardComponent from './component';
import { getUserID, checkClash, amendment, specOnChange } from './actions';

const mapStateToProps = state => ({
  userID: state.dashBoard.userID,
  oldModules: state.dashBoard.oldModules,
  loading: state.dashBoard.loading,
  newModules: state.dashBoard.newModules,
  clash: state.dashBoard.checkClash,
  firstClash: state.dashBoard.firstClash,
  checkClashLoading: state.dashBoard.checkClashLoading,
  moduleTimetables: state.dashBoard.moduleTimetables,
  newTimetable: state.dashBoard.newTimetable,
  specialisation: state.dashBoard.specialisation,
});

const mapDispatchToProps = dispatch => bindActionCreators({
  getUserID,
  checkClash,
  amendment,
  specOnChange,
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(DashBoardComponent);
