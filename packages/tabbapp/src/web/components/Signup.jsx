import React from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';
import Text from 'web/components/Inputs/Text';
import { signupInit } from 'ducks/auth/actions';
import Grid from '@material-ui/core/Grid';

const gridItemStyle = {
  width: '100%',
};

let SignupForm = ({ handleSubmit, submitComponent }) => {
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
        </Grid>
      </Grid>
      {submitComponent}
    </form>
  );
};
SignupForm = reduxForm({
  form: 'auth/signup',
})(SignupForm);

const Signup = ({ signup, submitComponent }) => {
  return (
    <div>
      <SignupForm onSubmit={signup} submitComponent={submitComponent} />
    </div>
  );
};

export default connect(
  state => ({}),
  {
    signup: signupInit,
  },
)(Signup);
