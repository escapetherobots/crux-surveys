import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import StripeWrapper from './StripeWrapper'; // In Demo this is: Payments

class Header extends React.Component{
  renderContent(){
    switch(this.props.auth){
      case null:
        return;
      case false:
        return (
          <li><a href="/auth/google">Login With Google</a></li>
        );
      default:
        return [
          <li key="stripeWrapper"><StripeWrapper /></li>,
          <li key="userCredits" style={{margin: '0 10px'}}>Credits: {this.props.auth.credits}</li>,
          <li key="logoutButton"><a href="/api/logout">Logout</a></li>
        ];
    }
  }

  render(){
    console.log(">>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>");
    console.log('check if user is logged in>>>>', this.props.auth);
    return (
      <nav className="teal lighten-2">
        <div className="nav-wrapper container">
          <Link to={this.props.auth ? '/surveys' : '/'} className="left brand-logo">
            Crux Surveys
          </Link>
          <ul className="right">
            {this.renderContent()}
          </ul>
        </div>
      </nav>
    );
  }
}

// NON DESTRUCTURED VERSION
// function mapStateToProps(state){
//   return {
//     auth: state.auth
//   }
// }
function mapStateToProps({auth}){
  return {auth};
}

export default connect(mapStateToProps)(Header);
