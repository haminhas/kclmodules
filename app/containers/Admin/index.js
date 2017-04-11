import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import AdminComponent from './component';
import { getProgrammes, programmesOnChange } from './actions';

const mapStateToProps = state => ({
  programmes: state.admin.programmes,
  loading: state.admin.loading,
  newData: state.admin.newData,
  oldData: state.admin.oldData
});

const mapDispatchToProps = dispatch => bindActionCreators({
  getProgrammes,
  programmesOnChange
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(AdminComponent);
