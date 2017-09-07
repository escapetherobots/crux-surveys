import React from 'react';
import SurveyForm from './SurveyForm';
import SurveyFormReview from './SurveyFormReview';
import { reduxForm } from 'redux-form';


class SurveyNew extends React.Component {
  //constructor(){}

  // create react app babel helper for constructor level state
  state = {
    showFormReview: false
  };

  renderContent(){
    if(this.state.showFormReview) {
      return <SurveyFormReview onCancel={ () => this.setState({ showFormReview: false }) } />;
    }

    return <SurveyForm onSurveySubmit={ () => this.setState({ showFormReview: true }) }/>;
  }

  render(){
    return (
      <div>
        {this.renderContent()}
      </div>
    );
  }
}

export default reduxForm({
  form: 'surveyForm' // this connects to the state.surveyForm prop and sets the default for this component to destroy on unmount
})(SurveyNew);
