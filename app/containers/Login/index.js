import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { login } from 'app/containers/Auth/actions';
// import validate from './validate';
import LoginComponent from './component';

const mapStateToProps = state => ({
  applicationError: state.applicationError,
});

const mapDispatchToProps = dispatch => bindActionCreators({
  login,
}, dispatch);

export default connect(mapStateToProps,
mapDispatchToProps)(LoginComponent);
