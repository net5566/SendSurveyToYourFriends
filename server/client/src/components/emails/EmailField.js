// EmailField
// receive title

import React, { Component } from 'react';

class EmailField extends Component {
    render() {
      return (
        <div>
            <label>{this.props.label}</label>
            <input {...this.props.input} style={{ marginBottom: '5px' }} />
            <div className="red-text" style={{ marginBottom: '10px', fontSize: '9px' }}>
                {this.props.meta.touched && this.props.meta.error}
            </div>
        </div>
      );
    }
}

export default EmailField;