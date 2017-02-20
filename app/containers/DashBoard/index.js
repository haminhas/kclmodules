import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import DashBoardComponent from './component';
import { getUserID, checkClash, expandedOnChange } from './actions';

const mapStateToProps = state => ({
  userID: state.dashBoard.userID,
  loading: state.dashBoard.loading,
  clash: state.dashBoard.checkClash,
  firstClash: state.dashBoard.firstClash,
  checkClashLoading: state.dashBoard.checkClashLoading,
  newTimetable: state.dashBoard.newTimetable,
  specialisation: state.dashBoard.specialisation,
  expanded: state.dashBoard.expanded,
});

const mapDispatchToProps = dispatch => bindActionCreators({
  getUserID,
  checkClash,
  expandedOnChange,
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(DashBoardComponent);
