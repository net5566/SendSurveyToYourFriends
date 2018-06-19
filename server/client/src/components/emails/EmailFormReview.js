import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import * as actions from '../../actions';
import FormConstants from '../../constants/FormConstants';

const EmailFormReview = ({ onCancel, formValues, submitSurvey, history }) => {
    const reviewField = FormConstants.FORM_FIELD.map(({name, label}) => {
        return (
            <div key={name}>
                <label>{label}</label>
                <div>{formValues[name]}</div>
            </div>
        );
    });

    return (
        <div>
            <h5>Please confirm your entries</h5>
            <div>
                {reviewField}
            </div>
            <button
                className="blue darken-1 btn-flat white-text"
                onClick={onCancel}
            >
                back
            </button>
            <button
                className="orange right btn-flat white-text"
                onClick={() => submitSurvey(formValues, history)}
            >
                Send Emails
                <i className="material-icons right">email</i>
            </button>
        </div>
    );
};

function mapStateToProps(state) {
    return { formValues: state.form.emailForm.values };
}

export default connect(mapStateToProps, actions)(withRouter(EmailFormReview));