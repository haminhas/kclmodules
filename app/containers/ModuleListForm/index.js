import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import ModuleListFormComponent from './component';
import {
  moduleOnChange,
  loadOldModules,
  loadNewModules,
} from './actions';
import { checkClash } from 'app/containers/DashBoard/actions';


const mapStateToProps = state => ({
  newTimetable: state.dashBoard.newTimetable,
  newFormModules: state.form.newModules,
  oldFormModules: state.form.oldModules,
  modulesInvalid: state.form.modulesInvalid,
});

const mapDispatchToProps = dispatch => bindActionCreators({
  moduleOnChange,
  loadOldModules,
  loadNewModules,
  checkClash,
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(ModuleListFormComponent);
