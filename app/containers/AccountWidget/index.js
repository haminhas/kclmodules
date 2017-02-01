import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import AccountWidget from './component';
import { logout } from 'app/containers/AccountWidget/actions';

const mapStateToProps = state => ({
  isLoggedIn: state.account.isLoggedIn,
});

const mapDispatchToProps = dispatch => bindActionCreators({
  logout,
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(AccountWidget);
