import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import DashBoardComponent from './component';
import { getUserID, expandedOnChange } from './actions';

const mapStateToProps = state => ({
  userID: state.dashBoard.userID,
  loading: state.dashBoard.loading,
  clash: state.dashBoard.checkClash,
  firstClash: state.dashBoard.firstClash,
  checkClashLoading: state.dashBoard.checkClashLoading,
  newTimetable: state.dashBoard.newTimetable,
  specialisation: state.dashBoard.specialisation,
  expanded: state.dashBoard.expanded,
  isAdmin: state.dashBoard.isAdmin,
});

const mapDispatchToProps = dispatch => bindActionCreators({
  getUserID,
  expandedOnChange,
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(DashBoardComponent);
