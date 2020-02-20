import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import { Field, reduxForm, SubmissionError } from 'redux-form';
import { compose } from 'redux';
import { firebaseConnect } from 'react-redux-firebase';

import Email from '@material-ui/icons/EmailRounded';
import Visibility from '@material-ui/icons/VisibilityRounded';
import VisibilityOff from '@material-ui/icons/VisibilityOffRounded';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import DialogActions from '@material-ui/core/DialogActions';
import Button from '@material-ui/core/Button';

import Typography from '@material-ui/core/Typography';
import Text from '../Inputs/Text';
import GoogleButton from '../GoogleButton';
import FacebookButton from '../FacebookButton';

import FacebookLogo from '../../icons/FacebookLogo';
import GoogleLogo from '../../icons/GoogleLogo';

import IconButton from '@material-ui/core/IconButton';
import InputAdornment from '@material-ui/core/InputAdornment';
import Avatar from '@material-ui/core/Avatar';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Divider from '@material-ui/core/Divider';
import ToggleIcon from 'material-ui-toggle-icon';

class PasswordForm extends React.Component {
  state = {
    showPassword: false,
    errors: {}
  }

  onError = error => {
    console.log(error);
    if (error.code === 'auth/wrong-password')
      this.setState({ errors: { password: 'The password is incorrect' } });
  }

  render = () => {
    const {
      handleSubmit,
      onSubmit = () => { },
      submitting,
      email,
    } = this.props;
    const {
      showPassword,
      errors
    } = this.state;

    return (
      <form onSubmit={handleSubmit((params) => {
        onSubmit({
          onError: this.onError,
          ...params
        })
      })}>
        <Field
          name="email"
          component={Text}
          componentProps={{
            label: 'Email address',
            type: 'email',
            disabled: true,
            fullWidth: true,
            name: 'email',
            autocapitalization: 'none',
            autoComplete: 'email',
            value: email
          }}
        />
        <Field
          name="password"
          component={Text}
          meta={{ error: errors.password }}
          componentProps={{
            style: { marginTop: 8 },
            label: 'Password',
            type: showPassword ? 'text' : 'password',
            fullWidth: true,
            name: 'password',
            autoComplete: 'current-password',
            InputProps: {
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    aria-label="Toggle password visibility"
                    onClick={() => { this.setState({ showPassword: !showPassword }) }}>
                    <ToggleIcon
                      on={!showPassword}
                      onIcon={<Visibility />}
                      offIcon={<VisibilityOff />} />
                  </IconButton>
                </InputAdornment>
              ),
            }
          }}
        />
        <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
          <Button disabled={submitting} style={{ marginTop: 24, marginRight: -16 }} type="submit" color="primary">
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

const providers = {
  'google.com': {
    name: 'Google account',
    className: 'google',
    icon: () => <GoogleLogo />,
    component: ({ firebase, callback }) => <GoogleButton onClick={() => {
      firebase.login({ provider: 'google', type: 'popup' }).then(callback);
    }} />
  },
  'facebook.com': {
    name: 'Facebook account',
    className: 'facebook',
    icon: () => <FacebookLogo />,
    component: ({ firebase, callback }) => <FacebookButton onClick={() => {
      firebase.login({ provider: 'facebook', type: 'popup' }).then(callback);
    }} />
  },
  'password': {
    name: 'Email address',
    icon: () => <Email />,
    component: ({ firebase, email, callback }) => <PasswordForm onSubmit={params => {
      const { email, password } = params;
      firebase.login({ email, password }).then(callback);
    }} email={email} />
  },
}

const styles = theme => ({
  google: theme.palette.type === 'light' ? {
    backgroundColor: 'transparent',
    border: '1px solid rgba(0, 0, 0, 0.23)'
  } : {
      backgroundColor: 'rgba(255, 255, 255, 0.87)',
    },
  facebook: {
    backgroundColor: '#3b5998',
    color: '#fff'
  }
});

export const AccountExistsDialog = (props) => {
  const {
    classes,
    onClose,
    firebase,
    methods,
    providerName,
    email,
    action,
    open = false,
    ...other
  } = props;
  return (
    <Dialog onClose={onClose} open={open} {...other}>
      {providerName && <DialogContent style={{ paddingBottom: 0 }}>
        <Typography style={{ marginBottom: 8 }} variant="overline" color="textSecondary">
          Login attempt
        </Typography>
        <ListItem style={{ padding: 0 }}>
          <Avatar className={classes[providers[providerName].className]}>
            {providers[providerName].icon()}
          </Avatar>
          <ListItemText primary={email} primaryTypographyProps={{ noWrap: true }} secondary={providers[providerName].name} />
        </ListItem>
      </DialogContent>}
      {providerName && <Divider style={{ marginTop: 16, marginBottom: 16 }} />}
      <DialogContent>
        <Typography style={{ marginBottom: 8 }} variant="caption" color="textSecondary">
          {`Your account already exists with this email address, continue with one of the providers below to sign in.`}
        </Typography>
        {methods && methods.map(method => {
          const provider = providers[method];
          return <div key={method} style={{ paddingTop: 8 }}>
            <provider.component
              firebase={firebase}
              email={email}
              callback={onClose} />
          </div>;
        })}
      </DialogContent>
    </Dialog>
  );
}

export default compose(
  firebaseConnect(),
  withStyles(styles)
)(AccountExistsDialog);
