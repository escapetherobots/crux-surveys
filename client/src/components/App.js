import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom'
import * as actions from './../actions';
import { connect } from 'react-redux';

import Header from './Header';
import Landing from './Landing';

// dummy components
const Dashboard = () => <h2>Dashboard</h2>
const SurveyNew = () => <h2>SurveyNew</h2>

// not functional component - functional components don't have life cycle methods
export class App extends React.Component{
  componentDidMount(){
    // preferred method for initial ajax requests
    // 1. check initial USER
    this.props.fetchUser();
  }

  render(){
    return (
      <div>
        <BrowserRouter>
          <div>
            <Header />
            <div className="container">
              <Route exact path="/" component={Landing} />
              <Route exact path="/surveys" component={Dashboard} />
              <Route path="/surveys/new" component={SurveyNew} />
            </div>
          </div>
        </BrowserRouter>
      </div>
    );
  }
}

// first arg on connect = mapStateToProps, second is mapDispatchToProps
export default connect(null, actions)(App);
