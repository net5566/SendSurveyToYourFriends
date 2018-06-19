import React, { Component } from 'react';
import { reduxForm } from 'redux-form'; 
import EmailForm from './EmailForm';
import EmailFormReview from './EmailFormReview';

class EmailNew extends Component {
    constructor(props) {
        super(props);

        this.state = { showFormReview: false };
    }

    handleCancel = () => {
        this.setState({ showFormReview: false });
    }

    renderContent() {
        if (this.state.showFormReview) {
            return (
                <EmailFormReview
                    onCancel = {this.handleCancel}
                />
            );
        }
        return (
            <EmailForm
                onEmailSubmit={() => this.setState({ showFormReview: true })} 
            />
        );
    }

    render() {
        return (
            <div>
                {this.renderContent()}
            </div>
        );
    }
}

export default reduxForm({
    form: 'emailForm'
})(EmailNew);