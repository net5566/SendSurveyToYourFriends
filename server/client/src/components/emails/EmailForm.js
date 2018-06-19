import _ from 'lodash';
import React, { Component } from 'react';
import { reduxForm, Field } from 'redux-form';
import { Link } from 'react-router-dom';

import EmailField from './EmailField';
import validateEmails from '../../utils/validateEmails';

import FormConstants from '../../constants/FormConstants';

class EmailForm extends Component {
    renderFields() {
        return _.map(FormConstants.FORM_FIELD, ({ label, name }) => {
            return (
                <Field
                    key={label}
                    label={label}
                    name={name}
                    component={EmailField}
                    type="text" 
                />
            );
        });
    }
    render() {
        const { handleSubmit, onEmailSubmit } = this.props;
        return (
            <div>
                <form
                    onSubmit={handleSubmit(onEmailSubmit)}
                >
                    {this.renderFields()}
                    <Link to="/surveys" className="red btn-flat white-text">
                        cancel
                    </Link>
                    <button type="submit" className="teal btn-flat right white-text">
                        Submit
                        <i className="material-icons right">done</i>
                    </button>
                </form>
            </div>
      );
    }
}

const validate = (values) => {
    const errors = {};

    if (!values.title) {
        errors.title = 'You must provide a title';
    }

    if (!values.subject) {
        errors.subject = 'You must provide a subject';
    }

    if (!values.body) {
        errors.body = 'You must provide email body';
    }

    if (!values.emails) {
        errors.emails = 'You must provide recipient list';
    }

    /*
    _.each(FIELD, ({ name }) => {
        if (!values[name]) {
            errors[name] = 'You must provide a '
        };
    });
    */

    errors.emails = validateEmails(values.emails || '');

    return errors;
};

export default reduxForm({
    validate: validate,
    form: 'emailForm',
    destroyOnUnmount: false
})(EmailForm);