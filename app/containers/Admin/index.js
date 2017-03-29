import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import AdminComponent from './component';
import { getProgrammes } from './actions';

const mapStateToProps = state => ({
  programmes: state.admin.programmes,
  loading: state.admin.loading,
});

const mapDispatchToProps = dispatch => bindActionCreators({
  getProgrammes,
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(AdminComponent);
