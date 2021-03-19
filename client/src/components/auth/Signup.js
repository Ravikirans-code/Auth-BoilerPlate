import React, { Component } from 'react';
import { reduxForm, Field } from 'redux-form';
import { compose } from 'redux';
import { connect } from 'react-redux';
import * as actions from '../../actions';

class Signup extends Component {
    onSubmit = (formProps) => {
        this.props.signup(formProps, () => {
            console.log('aasass');
            this.props.history.push('/feature');
        });
    }
    showError(_this) {
        if (_this.props.errorMessage !== undefined) {
            return <div className="error warning-msg">
                <i className="fa fa-warning"></i>
                {_this.props.errorMessage}
            </div>
        }
    }
    render() {
        const { handleSubmit } = this.props;

        return (
            <form onSubmit={handleSubmit(this.onSubmit)}>
                <div className="formfeild">
                    <fieldset>
                        <label> Email</label>
                        <Field
                            name="email"
                            type="text"
                            component="input"
                            autoComplete="none"
                        />
                    </fieldset>
                    <fieldset>
                        <label> Password</label>
                        <Field
                            name="password"
                            type="password"
                            component="input"
                            autoComplete="none"
                        />
                    </fieldset>
                <button>Sign Up </button>
                </div>
                {this.showError(this)}
            </form>
        )
    }
}
function mapStateToProps(state) {
    return { errorMessage: state.auth.errorMessage }
}
export default compose(
    connect(mapStateToProps, actions),
    reduxForm({ form: 'signup' })
)(Signup);