import React from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';
import Text from 'web/components/Inputs/Text';
import { loginInit } from 'ducks/auth/actions';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';

const gridItemStyle = {
  width: '100%',
};

let LoginForm = ({ handleSubmit }) => {
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
      <Button type="submit">Log in</Button>
    </form>
  );
};
LoginForm = reduxForm({
  form: 'auth/login',
})(LoginForm);

const Login = ({ login }) => {
  return (
    <div>
      <LoginForm onSubmit={login} />
    </div>
  );
};

export default connect(
  () => ({}),
  {
    login: loginInit,
  },
)(Login);
