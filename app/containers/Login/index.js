import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { reduxForm } from 'redux-form';

// import { login } from 'app/containers/Auth/actions';

import LoginForm from './component';
import validate from './validate';

const LoginFormContainer = reduxForm({
  form: 'loginForm',
  validate,
})(LoginForm);

// const mapStateToProps = state => ({
//   applicationError: state.applicationError,
// });

// const mapDispatchToProps = dispatch => bindActionCreators({
//   onSubmit: login,
// }, dispatch);

export default connect()(LoginFormContainer);
