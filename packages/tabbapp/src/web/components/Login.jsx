import React from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';
import Text from 'web/components/Inputs/Text';
import { loginInit } from 'ducks/auth/actions';
import Grid from '@material-ui/core/Grid';
import FormHelperText from '@material-ui/core/FormHelperText';
import ErrorMessage from 'web/components/ErrorMessage';
import authTypes from 'ducks/auth/types';
import FormControl from '@material-ui/core/FormControl';

const gridItemStyle = {
  width: '100%',
};

let LoginForm = ({ handleSubmit, submitComponent }) => {
  const ErrorComponent = () => (<ErrorMessage actionType={authTypes.LOGIN_FAIL}/>);
  return (
    <form onSubmit={handleSubmit}>
      <Grid container alignItems="center" direction="column">
        <Grid item style={gridItemStyle}>
          <Field
            name="email"
            component={Text}
            componentProps={{
              label: 'Email',
              type: 'email',
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
LoginForm = reduxForm({
  form: 'auth/login',
})(LoginForm);

const Login = ({ login, submitComponent, qr }) => {
  return (
    <div>
      <LoginForm onSubmit={({ email, password }) => login({ email, password, qr })} submitComponent={submitComponent} />
    </div>
  );
};

export default connect(
  state => ({}),
  {
    login: loginInit,
  },
)(Login);
