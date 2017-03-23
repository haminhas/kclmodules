import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import ModuleListFormComponent from './component';
import { checkClash, moduleOnChange, compulsoryClash, searchModule } from './actions';


const mapStateToProps = state => ({
  newTimetable: state.dashBoard.newTimetable,
  newModules: state.dashBoard.newModules,
  oldModules: state.dashBoard.oldModules,
  moduleTimetables: state.dashBoard.moduleTimetables,
});

const mapDispatchToProps = dispatch => bindActionCreators({
  moduleOnChange,
  checkClash,
  compulsoryClash,
  searchModule,
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(ModuleListFormComponent);
