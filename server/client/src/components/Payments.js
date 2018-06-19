import React, { Component } from 'react';
import ReactStripeCheckout from 'react-stripe-checkout';
import { connect } from 'react-redux';
import * as actions from '../actions';

const money = 500;

class Payments extends Component {

    onToken = (token) => {
        this.props.handleToken(token);
    }

    render() {
        return (
            <ReactStripeCheckout
                name="Yes"
                description="demo"
                amount={money}
                token={this.onToken}
                stripeKey={process.env.REACT_APP_STRIPE_KEY}
            >
                <button className="btn">
                    Add Credits
                </button>
            </ ReactStripeCheckout>
        );
    }
}

export default connect(null, actions)(Payments);