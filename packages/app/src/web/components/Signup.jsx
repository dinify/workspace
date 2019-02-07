import React from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';
import Text from 'tabb-front/dist/components/Inputs/Text';
import { signupInit } from 'ducks/auth/actions';
import authTypes from 'ducks/auth/types';
import FormHelperText from '@material-ui/core/FormHelperText';
import Grid from '@material-ui/core/Grid';
import FormControl from '@material-ui/core/FormControl';
import ErrorMessage from 'web/components/ErrorMessage';

const gridItemStyle = {
  width: '100%',
};

const errorTranslations = {
  'E002011': 'Account with this e-mail or phone number already exists',
  'E010203': 'Your password must be at least 8 characters and include 1 capital letter and 1 numeral',
  'E010201': 'Please enter your full name'
}

let SignupForm = ({ handleSubmit, submitComponent }) => {
  const ErrorComponent = () => (
    <ErrorMessage actionType={authTypes.SIGNUP_FAIL} translations={errorTranslations} />
  );
  return (
    <form onSubmit={handleSubmit}>
      <Grid container alignItems="center" direction="column">
        <Grid item style={gridItemStyle}>
          <Field
            name="name"
            component={Text}
            componentProps={{
              label: 'Full name',
              fullWidth: true,
            }}
          />
        </Grid>
        <Grid item style={gridItemStyle}>
          <Field
            name="phone"
            component={Text}
            componentProps={{
              label: 'Phone number',
              fullWidth: true,
            }}
          />
        </Grid>
        <Grid item style={gridItemStyle}>
          <Field
            name="email"
            component={Text}
            componentProps={{
              label: 'Email',
              fullWidth: true,
            }}
          />
        </Grid>
        <Grid item style={gridItemStyle}>
          <Field
            name="password"
            component={Text}
            componentProps={{
              label: 'Password',
              type: 'password',
              fullWidth: true,
            }}
          />
          <FormControl error>
            <FormHelperText>
              <ErrorComponent />
            </FormHelperText>
          </FormControl>
        </Grid>
      </Grid>
      {submitComponent}
    </form>
  );
};
SignupForm = reduxForm({
  form: 'auth/signup',
})(SignupForm);

const Signup = ({ signup, submitComponent, qr }) => {
  return (
    <div>
      <SignupForm
        onSubmit={({ name, phone, email, password }) => signup({ name, phone, email, password, qr })}
        submitComponent={submitComponent}
      />
    </div>
  );
};

export default connect(
  state => ({}),
  {
    signup: signupInit,
  },
)(Signup);
