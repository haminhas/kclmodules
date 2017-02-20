import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { specOnChange } from 'app/containers/DashBoard/actions';
import SpecListComponent from './component';

const mapStateToProps = state => ({
  specialisation: state.dashBoard.specialisation,
});

const mapDispatchToProps = dispatch => bindActionCreators({
  specOnChange,
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(SpecListComponent);
