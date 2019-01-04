import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import { Field, reduxForm, SubmissionError } from 'redux-form';
import Visibility from '@material-ui/icons/VisibilityRounded';
import VisibilityOff from '@material-ui/icons/VisibilityOffRounded';
import Typography from '@material-ui/core/Typography';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import DialogActions from '@material-ui/core/DialogActions';
import Button from '@material-ui/core/Button';
import Text from 'web/components/Inputs/Text';
import GoogleButton from 'web/components/GoogleButton';
import FacebookButton from 'web/components/FacebookButton';
import IconButton from '@material-ui/core/IconButton';
import InputAdornment from '@material-ui/core/InputAdornment';
import ToggleIcon from 'material-ui-toggle-icon';

const styles = theme => ({

});

class PasswordForm extends React.Component {
  state = {
    showPassword: false,
    errors: {}
  }

  onError = error => {
    console.log(error);
    if (error.code === 'auth/wrong-password')
      this.setState({errors: { password: 'The password is incorrect'}});
  }

  render = () => {
    const {
      handleSubmit,
      onSubmit = () => {},
      submitting,
      email,
    } = this.props;
    const {
      showPassword,
      errors
    } = this.state;

    return (
      <form onSubmit={handleSubmit((params) => {onSubmit({
        onError: this.onError,
        ...params
      })})}>
        <Field
          name="email"
          component={Text}
          componentProps={{
            label: 'Email address',
            type: 'email',
            disabled: true,
            fullWidth: true,
            variant: 'outlined',
            name: 'email',
            autocapitalization: 'none',
            autoComplete: 'email',
            value: email
          }}
        />
        <Field
          name="password"
          component={Text}
          meta={{error: errors.password}}
          componentProps={{
            style: {marginTop: 8},
            label: 'Password',
            type: showPassword ? 'text' : 'password',
            fullWidth: true,
            variant: 'outlined',
            name: 'password',
            autoComplete: 'new-password',
            InputProps: {
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    aria-label="Toggle password visibility"
                    onClick={() => {this.setState({showPassword: !showPassword})}}>
                    <ToggleIcon
                      on={!showPassword}
                      onIcon={<Visibility />}
                      offIcon={<VisibilityOff />}/>
                  </IconButton>
                </InputAdornment>
              ),
            }
          }}
        />
        <div style={{display: 'flex', justifyContent: 'flex-end'}}>
          <Button disabled={submitting} style={{marginTop: 8}} type="submit" color="primary">
            Sign in
          </Button>
        </div>
      </form>
    )
  }
}

PasswordForm = reduxForm({
  form: 'auth/password',
})(PasswordForm);

const methods = {
  'password': {
    name: 'this email',
    component: ({callback, email}) => <PasswordForm onSubmit={callback} email={email} />
  },
  'facebook.com': {
    name: 'Facebook',
    component: ({callback}) => <FacebookButton onClick={callback} />
  },
  'google.com': {
    name: 'Google',
    component: ({callback}) => <GoogleButton onClick={callback} />
  }
}

const AccountExistsDialog = ({
  classes,
  onClose,
  method,
  attempt,
  email,
  action,
  ...other
}) => {
  const current = methods[method];
  const attempted = methods[attempt];
  return (
    <Dialog onClose={onClose} {...other}>
      <DialogTitle>
        Signin failed
      </DialogTitle>
      <DialogContent>
        <Typography style={{marginBottom: 16}} variant="body1">
          {`An account already exists with ${attempted.name}, continue with ${current.name} to sign in.`}
        </Typography>
        <current.component email={email} callback={(params) => {
          action(params).then(() => {
            onClose();
          }).catch(error => {
            params.onError(error);
          });
        }}/>
      </DialogContent>
    </Dialog>
  );
}

export default withStyles(styles)(AccountExistsDialog);
