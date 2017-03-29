import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

// import { amendment } from 'app/containers/DashBoard/actions';
import { amendment } from './actions';

import TimetableGridComponent from './component';

const mapStateToProps = state => ({
  timetable: state.dashBoard.newTimetable,
  oldMod: state.dashBoard.requestOldMod,
  newMod: state.dashBoard.requestNewMod,
});

const mapDispatchToProps = dispatch => bindActionCreators({
  amendment,
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(TimetableGridComponent);
