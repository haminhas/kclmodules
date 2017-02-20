import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import ModuleListFormComponent from './component';
import { checkClash, moduleOnChange } from 'app/containers/DashBoard/actions';


const mapStateToProps = state => ({
  newTimetable: state.dashBoard.newTimetable,
  newModules: state.dashBoard.newModules,
  oldModules: state.dashBoard.oldModules,
  modulesInvalid: state.dashBoard.modulesInvalid,
  moduleTimetables: state.dashBoard.moduleTimetables,
});

const mapDispatchToProps = dispatch => bindActionCreators({
  moduleOnChange,
  checkClash,
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(ModuleListFormComponent);
