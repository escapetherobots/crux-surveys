import { combineReducers } from 'redux';
import authReducer from './authReducer';
import surveysReducer from './surveysReducer';
// redux-form reducer
import { reducer as reduxForm } from 'redux-form';

export default combineReducers({
  auth: authReducer,
  surveys: surveysReducer,
  form: reduxForm // the key must be "form" - per redux-form docs!!!
});
