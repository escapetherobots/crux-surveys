import React from 'react';
import { Link } from 'react-router-dom';
import _ from 'lodash';

import validateEmails from '../../utils/validateEmails';
import formFields from './formFields';
// redux form
import { reduxForm, Field } from 'redux-form'; // similar to connect helper from redux
import SurveyField from './SurveyField';




class SurveyForm extends React.Component {

  renderFields(){
    return _.map(formFields, field => {
      return <Field component={SurveyField} type="text" {...field} key={field.name}/>
    })
  }

  render(){
    return (
      <div>
        {/* this.props.handleSubmit method is provided via redux-form */}
        {/* <form onSubmit={this.props.handleSubmit( values => console.log(values) )}> */}
        <form onSubmit={this.props.handleSubmit( this.props.onSurveySubmit )}>
          {this.renderFields()}
          <Link to="/surveys" className="red btn-flat white-text">
            Cancel
          </Link>
          <button className="teal btn-flat right white-text" type="submit">
            Next
            <i className="material-icons right">done</i>
          </button>

        </form>
      </div>
    );
  }
}

// argument passed from the actual form: title, subject, body, recips
function validate(values){
  const errors = {};
  // if no errors then form will return
  // if(!values.title) {
  //   errors.title = 'You must provide a title';
  // }

  // add error for recipients field on form
  errors.recipients = validateEmails(values.recipients || ''); // if no email string, validate empty string

  // callback argument = field object name property
  _.each(formFields, ({name}) => {
    if(!values[name]){
      errors[name] = 'You must provide a value';
    }
  });



  return errors;

}

// REDUX-FORM HELPER:
// INITIALIZE AND CONFIGURES FORM
const form = {
  validate,
  form: 'surveyForm', // namespace that will be added to the redux state
  destroyOnUnmount: false, // maintain data even if component unmounted
};

export default reduxForm(form)(SurveyForm); // this will generate this.props.handleSubmit method
