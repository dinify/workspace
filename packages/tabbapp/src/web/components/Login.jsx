import React from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';
import Text from 'web/components/Inputs/Text';
import { loginInit } from 'ducks/auth/actions';
import Grid from '@material-ui/core/Grid';

const gridItemStyle = {
  width: '100%',
};

let LoginForm = ({ handleSubmit, submitComponent }) => {
  return (
    <form onSubmit={handleSubmit}>
      <Grid container alignItems="center" direction="column">
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
LoginForm = reduxForm({
  form: 'auth/login',
})(LoginForm);

const Login = ({ login, submitComponent }) => {
  return (
    <div>
      <LoginForm onSubmit={login} submitComponent={submitComponent} />
    </div>
  );
};

export default connect(
  state => ({}),
  {
    login: loginInit,
  },
)(Login);
