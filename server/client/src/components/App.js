import React, { Component } from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import { connect } from 'react-redux';
import * as actions from '../actions';

import Header from './Header';
import Landing from './Landing';
import Dashboard from './Dashboard';
import EmailNew from './emails/EmailNew';
// const Header = () => <h2>Header</h2>
// const Dashboard = () => <h2>Dashboard</h2>
//const SurveyNew = () => <h2>SurveyNew</h2>
//const Landing = () => <h2>Landing</h2>

class App extends Component {

    componentDidMount() {
        this.props.fetchUser();
    }

    render() {
        return(
            <BrowserRouter>
                <div className="container">
                    <Header />
                    <Route exact={true} path="/" component={Landing} />
                    <Route exact={true} path="/surveys" component={Dashboard} />
                    <Route path="/surveys/new" component={EmailNew} />
                </div>
            </BrowserRouter>
        );
    };
};

export default connect(null, actions)(App);