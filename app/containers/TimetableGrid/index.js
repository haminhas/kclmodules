import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { amendment } from 'app/containers/DashBoard/actions';
import TimetableGridComponent from './component';

const mapStateToProps = state => ({
  timetable: state.dashBoard.newTimetable,
});

const mapDispatchToProps = dispatch => bindActionCreators({
  amendment,
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(TimetableGridComponent);
