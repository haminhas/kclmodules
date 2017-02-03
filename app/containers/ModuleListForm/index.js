import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import ModuleListFormComponent from './component';
import { amendment } from './actions';

const mapStateToProps = state => ({
  modules: state.dashBoard.modules,
  newModules: state.dashBoard.newModules,
  checkClashLoading: state.dashBoard.checkClashLoading,
  moduleTimetables: state.dashBoard.moduleTimetables,
});

const mapDispatchToProps = dispatch => bindActionCreators({
  amendment,
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(ModuleListFormComponent);
