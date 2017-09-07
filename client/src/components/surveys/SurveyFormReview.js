import React from 'react';
import { connect } from 'react-redux';
import formFields from './formFields';
import _ from 'lodash';
import * as actions from './../../actions';
import { withRouter } from 'react-router-dom';

const SurveyFormReview = (/* props */{onCancel, formValues, submitSurvey, history}) => {
  const reviewFields = _.map(formFields, field => {
    return (
      <div key={field.name}>
        <label>{field.label}</label>
        <div>
          {formValues[field.name]}
        </div>
      </div>
    );
  });

  return (
    <div>
      <h5>Please confirm your entries</h5>
      {reviewFields}
      <button className="yellow white-text darken-2 btn-flat" onClick={onCancel}>Back</button>
      <button className="green white-text right btn-flat" onClick={() => submitSurvey(formValues, history)}>
        Send Survey
        <i className="material-icons right">email</i>
      </button>
    </div>
  );
};

function mapStateToProps(state){
  //console.log(state);
  return {
    formValues: state.form.surveyForm.values
  }
}

//2nd argument actions from action creators
// withRouter will pass history method to props
export default connect(mapStateToProps, actions)( withRouter(SurveyFormReview) );
