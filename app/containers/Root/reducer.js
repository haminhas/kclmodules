import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';

//import authReducer from 'app/containers/Auth/reducer';

export default combineReducers({
  form: formReducer,
});
