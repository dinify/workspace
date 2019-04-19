// @flow
import React from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux'
import { firebaseConnect } from 'react-redux-firebase';
import { withStyles } from '@material-ui/core/styles';
import { Field } from 'redux-form';
import { Motion, spring } from 'react-motion';
import ToggleIcon from 'material-ui-toggle-icon';

import Visibility from '@material-ui/icons/VisibilityRounded';
import VisibilityOff from '@material-ui/icons/VisibilityOffRounded';
import IconButton from '@material-ui/core/IconButton';
import InputAdornment from '@material-ui/core/InputAdornment';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import Button from '@material-ui/core/Button';

import Text from '../Inputs/Text';
import GoogleButton from '../GoogleButton';
import FacebookButton from '../FacebookButton';

import { setPage, setShowPassword } from '../../ducks/auth/actions';
import { openDialog as openDialogAction } from '../../ducks/ui/actions';
import { getPlatform } from '../../lib/FN';

const styles = theme => ({
  grow: {
    flex: 1,
  },
  flex: {
    display: 'flex',
    alignItems: 'center',
  },
  uncapitalized: {
    textTransform: 'none',
  },
  transitionOpacity: {
    transition: theme.transitions.create('opacity', {
      duration: theme.transitions.duration.shorter,
    }),
  },
  background: {
    backgroundColor: theme.palette.background.default
  }
});

const UP = 1;
const DOWN = -1;

class Fields extends React.Component {
  state = {
    errors: {}
  }

  componentWillReceiveProps(nextProps) {
    const { authError } = nextProps;
    const { page } = this.props;
    let errors = {};
    if (!authError) return;
    switch (authError.code) {
      case 'auth/invalid-email':
        errors.email = 'The email address is invalid';
        break;
      case 'auth/email-already-in-use':
        errors.email = 'The email address is already in use';
        break;
      case 'auth/weak-password':
        errors.password = 'The password is too weak';
        break;
      case 'auth/user-disabled':
        errors.email = 'This account has been disabled';
        break;
      case 'auth/user-not-found':
        errors.email = 'No account found with this email';
        break;
      case 'auth/wrong-password':
        errors.password = 'The passoword is incorrect';
        break;
      default:
        break;
    }

    // Clear form errors on page change
    if (nextProps.page !== page) errors = {};
    this.setState({ errors });
  }

  render() {
    const {
      classes,
      firebase,
      page,
      showPassword,
      setPage,
      setShowPassword,
      env
    } = this.props;
    const {
      errors
    } = this.state;
    const animConfig = { stiffness: 480, damping: 48 };

    const formOpen = page !== 'default';


    let emailLabel = 'Email address';

    if (page === 'default') {
      emailLabel = 'Continue with email';
    }

    const direction = env === 'DASHBOARD' ? DOWN : UP;

    const emailField = (
      <Field
        name="email"
        component={Text}
        componentProps={{
          label: emailLabel,
          error: errors.email,
          type: 'email',
          fullWidth: true,
          variant: 'filled',
          name: 'email',
          autocapitalization: 'none',
          autoComplete: 'email',
        }}
      />
    );

    const signupForm = style => (
      <div className={classes && classes.background} style={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 50,
        transform: `translate3d(0, ${style.x * 129 * direction}px, 0)`
      }}>
        <div className={classes && classes.background} style={{
          position: 'relative',
          zIndex: 70,
          transform: `translate3d(0, ${style.x * 129 * (direction === DOWN ? 1 : 0)}px, 0)`
        }}>
          {emailField}
        </div>
        {['default', 'signUp'].includes(page) && <div style={{
          position: 'relative',
          display: 'flex',
          marginTop: 8,
          zIndex: 60,
        }}>
          <Field
            name="firstName"
            component={Text}
            componentProps={{
              label: 'First name',
              disabled: !formOpen,
              type: 'text',
              variant: 'filled',
              name: 'fname',
              autoFocus: true,
              autoComplete: 'given-name',
              autocapitalization: 'words',
              style: {marginRight: 4, flex: 1}
            }}
          />
          <Field
            name="lastName"
            component={Text}
            componentProps={{
              label: 'Last name',
              disabled: !formOpen,
              type: 'text',
              variant: 'filled',
              name: 'lname',
              autoComplete: 'family-name',
              autocapitalization: 'words',
              style: {marginLeft: 4, flex: 1}
            }}
          />
        </div>}
        <Motion
          defaultStyle={{x: 1}}
          style={{x: spring(page === 'forgotPassword' ? 0 : 1, animConfig)}}>
          {style =>
            <div style={{position: 'relative', zIndex: 60}}>
            <div ref={node => {this.socialSection = node}} style={{
              willChange: 'transform',
              overflow: 'hidden',
              opacity: style.x**(1/3),
              transformOrigin: 'top center',
              transform: `scale(1, ${style.x}) translate3d(0, 0, 0)`
            }}>
              <div ref={node => {this.socialSection = node}} style={{
                transformOrigin: 'top center',
                transform: `scale(1, ${1 / style.x}) translate3d(0, 0, 0)`
              }}>
                <Field
                  name="password"
                  component={Text}
                  meta={{error: errors.password}}
                  componentProps={{
                    label: 'Password',
                    style: {marginTop: 8},
                    disabled: !formOpen,
                    type: showPassword ? 'text' : 'password',
                    fullWidth: true,
                    variant: 'filled',
                    name: 'password',
                    autoComplete: page === 'signUp' ? 'new-password' : 'current-password',
                    InputProps: {
                      endAdornment: (
                        <InputAdornment position="end">
                          <IconButton
                            disabled={!formOpen}
                            aria-label="Toggle password visibility"
                            onClick={() => {setShowPassword(!showPassword)}}>
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
              </div>
            </div>
          </div>
          }
        </Motion>
        {['forgotPassword', 'signIn'].includes(page) &&
          <Button
            variant="outlined"
            className={`${classes.uncapitalized} ${classes.transitionOpacity}`}
            onClick={() => setPage('forgotPassword')}
            style={{
              position: 'relative',
              zIndex: 60,
              marginTop: 8,
              opacity: page === 'forgotPassword' ? 0 : 1
            }}>
            Forgot password
          </Button>
        }
      </div>
    );

    const separator = (
      <div style={{marginBottom: 16}} className={classes && classes.flex}>
        <Divider className={classes && classes.grow} />
        <div style={{height: 0, display: 'flex', alignItems: 'center'}}>
          <Typography
            variant="caption"
            component="span"
            color="textSecondary"
            style={{ paddingLeft: 8, paddingRight: 8 }}>
            or
          </Typography>
        </div>
        <Divider className={classes && classes.grow} />
      </div>
    );

    const mobile = getPlatform() !== 'desktop';
    return (
      <Motion
        defaultStyle={{x: 1}}
        style={{x: spring(formOpen ? 0 : 1, animConfig)}}>
        {style => {
          return (
            <div style={{
              position: 'relative'
            }}>
              {direction === DOWN && signupForm(style)}
              <div style={{
                position: 'absolute',
                zIndex: 40,
                top: direction === DOWN ? 72 : 0,
                left: 0,
                right: 0,
                opacity: style.x,
              }}>
                {direction === DOWN && separator}
                <div style={{ paddingBottom: 16 }}>
                  <GoogleButton onClick={() => firebase.login({ provider: 'google', type: mobile ? 'redirect' : 'popup' })} />
                </div>
                <div style={{ paddingBottom: 16 }}>
                  <FacebookButton onClick={() => firebase.login({ provider: 'facebook', type: mobile ? 'redirect' : 'popup' })} />
                </div>
                {direction === UP && separator}
              </div>
              {direction === UP && signupForm(style)}
            </div>
          );
        }}
      </Motion>
    );
  }
}


export default compose(
  withStyles(styles),
  firebaseConnect(),
  connect(
    state => ({
      authError: state.firebase.authError,
      page: state.auth.page,
      showPassword: state.auth.showPassword
    }),
    {
      setPage,
      setShowPassword,
      openDialog: openDialogAction
    }
  )
)(Fields);
