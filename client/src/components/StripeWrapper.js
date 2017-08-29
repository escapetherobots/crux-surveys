import React from 'react';
import StripeCheckout from 'react-stripe-checkout';
import { connect } from 'react-redux';
import * as actions from './../actions';


class StripeWrapper extends React.Component{
  stripeStyles = {
    button: {
      "border": "1px solid white",
      "borderRadius": "6px",
      "backgroundColor": "transparent",
      "boxShadow": "none"
    }
  }

  render(){
    //debugger;
    console.log(this.props);
    return (
      <StripeCheckout
        name="Crux Surveys" // header
        description="Buy 5 credits for 5$"
        amount={500} // represents 5 dollars in us currency as initial amount
        //token={token => console.log(token)}
        token={token => this.props.handleToken(token)}
        // auth token to proceed with transaction | callback properties are "onSomething"
        // basically a giant object with transaction details
        stripeKey={process.env.REACT_APP_STRIPE_PUBLISHABLE_KEY}
      >
        <button className="btn" style={this.stripeStyles.button}>
          Add Credits
        </button>
      </StripeCheckout>
    );
  }
}

// function mapStateToProps(){
//
// }

export default connect(null, actions)(StripeWrapper);
