import React from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux'
import { firebaseConnect, isLoaded, isEmpty } from 'react-redux-firebase';
import { withStyles } from '@material-ui/core/styles';
import { Field, reduxForm, change, SubmissionError } from 'redux-form';
import { Link } from 'react-router-dom';
import { Motion, spring } from 'react-motion';
import { openDialog as openDialogAction } from 'ducks/ui/actions';
import ToggleIcon from 'material-ui-toggle-icon';
import LogoText from 'icons/LogoText';
import Cancel from '@material-ui/icons/CancelRounded';
import ChevronRight from '@material-ui/icons/ChevronRightRounded';
import ChevronLeft from '@material-ui/icons/ChevronLeftRounded';
import Visibility from '@material-ui/icons/VisibilityRounded';
import VisibilityOff from '@material-ui/icons/VisibilityOffRounded';
import CircularProgress from '@material-ui/core/CircularProgress';

import IconButton from '@material-ui/core/IconButton';
import InputAdornment from '@material-ui/core/InputAdornment';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import Button from '@material-ui/core/Button';
import AccountExistsDialog from 'web/components/dialogs/AccountExistsDialog';
import Text from 'web/components/Inputs/Text';
import ResponsiveContainer from 'web/components/ResponsiveContainer';
import GoogleButton from 'web/components/GoogleButton';
import FacebookButton from 'web/components/FacebookButton';
import { setPage, setShowPassword } from 'ducks/auth/actions';

const styles = theme => ({
  grow: {
    flex: 1,
  },
  small: {
    width: 20,
    height: 20,
  },
  flex: {
    display: 'flex',
    alignItems: 'center',
  },
  uncapitalized: {
    textTransform: 'none',
  },
  colorTextSecondary: {
    color: theme.palette.text.secondary
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

class SignInForm extends React.Component {
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

  validateEmail = (email) => {
    const errors = {};
    if (!email) {
      errors.email = 'Required';
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(email)) {
      errors.email = 'Invalid email address';
    }
    // TODO correct regexp
    // if (Object.keys(errors).length !== 0) throw new SubmissionError(errors);
  }

  signIn = ({ email, password }) => {
    this.validateEmail(email);
    const errors = {};
    if (!password) errors.password = 'Required';
    if (Object.keys(errors).length !== 0) throw new SubmissionError(errors);
    const { firebase } = this.props;
    firebase.login({ email, password });
  }

  signUp = ({ email, password, firstName, lastName }) => {
    this.validateEmail(email);
    const errors = {};
    if (!password) errors.password = 'Required';
    if (!firstName) errors.firstName = 'Required';
    if (!lastName) errors.lastName = 'Required';
    if (Object.keys(errors).length !== 0) throw new SubmissionError(errors);
    const { firebase } = this.props;
    firebase.createUser(
      { email, password },
      {
        displayName: `${firstName} ${lastName}`,
        email
      }
    )
  }

  decide = ({ email }) => {
    this.validateEmail(email);
    const { firebase, openDialog, setPage } = this.props;
    const auth = firebase.auth();
    return auth.fetchSignInMethodsForEmail(email).then(methods => {
      if (methods.length === 0) {
        setPage('signUp');
      }
      else if (methods.includes('password')) {
        setPage('signIn');
      }
      // present user with dialog with options
      else {
        openDialog({
          id: 'account-exists',
          component: (props) => <AccountExistsDialog
            providerName="password"
            email={email}
            methods={methods}
            {...props}/>
        });
      }
    });
  }

  forgotPassword = ({ email }) => {
    const { firebase } = this.props;
    return firebase.auth().sendPasswordResetEmail(email);
  }

  render() {
    const {
      classes,
      handleSubmit,
      pristine,
      submitting,
      firebase,
      page,
      showPassword,
      setPage,
      setShowPassword,
      change,
    } = this.props;
    const {
      errors
    } = this.state;
    const animConfig = { stiffness: 480, damping: 48 };

    const formOpen = page !== 'default';

    let submitButtonText = 'Next';
    let submitFc = this.decide;
    let formTitle = 'Sign in';
    let formSubtitle = 'to access more features, like dining history, reviews and saving your favorites';
    let leftButtonAction = () => setPage(formOpen ? 'default' : 'signUp');
    let emailLabel = 'Email address';

    if (page === 'default') {
      emailLabel = 'Continue with email';
    }
    if (page === 'signIn') {
      submitButtonText = 'Sign in';
      formTitle = 'Sign in with password'
      submitFc = this.signIn;
    }
    if (page === 'signUp') {
      submitButtonText = 'Create account';
      formTitle = 'Create account';
      submitFc = this.signUp;
    }
    if (page === 'forgotPassword') {
      submitButtonText = 'Send email';
      formTitle = 'Forgot password';
      submitFc = this.forgotPassword;
      leftButtonAction = () => setPage('signIn');
      formSubtitle = 'enter the email address you use to sign in to get a password reset email'
    }

    return (
      <form
        onSubmit={handleSubmit(submitFc)}
        style={{height: 'calc(100vh - 112px)'}}
      >
        <ResponsiveContainer style={{
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center'
        }}>
          <div style={{
            marginLeft: 32,
            marginRight: 32,
            maxWidth: 512
          }}>
            <div style={{
              display: 'flex',
              alignItems: 'center',
              flexDirection: 'column',
              marginBottom: 16
            }}>
              <Link to="/">
                <div style={{
                  backgroundColor: "#c13939",
                  color: "rgba(255, 255, 255, 1)",
                  borderRadius: 74 / 2,
                  padding: '8px 16px'
                }}>
                  <LogoText color="inherit" style={{width: 74}}/>
                </div>
              </Link>
              <Typography style={{marginTop: 16, marginBottom: 8}} variant="h6">
                {formTitle}
              </Typography>
              <Typography align="center" variant="caption">
                {formSubtitle}
              </Typography>
            </div>
            <div style={{height: 185, overflow: 'hidden'}}>
              <Motion
                defaultStyle={{x: 1}}
                style={{x: spring(formOpen ? 0 : 1, animConfig)}}>
                {style => {
                  return (
                    <div style={{
                      position: 'relative'
                    }}>
                      <div style={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        right: 0,
                        opacity: style.x,
                      }}>
                        <div style={{ paddingBottom: 16 }}>
                          <GoogleButton onClick={() => firebase.login({ provider: 'google', type: 'popup' })} />
                        </div>
                        <div style={{ paddingBottom: 16 }}>
                          <FacebookButton onClick={() => firebase.login({ provider: 'facebook', type: 'popup' })} />
                        </div>
                        <div style={{marginBottom: 16}} className={classes.flex}>
                          <Divider className={classes.grow} />
                          <div style={{height: 0, display: 'flex', alignItems: 'center'}}>
                            <Typography
                              variant="caption"
                              component="span"
                              color="textSecondary"
                              style={{ paddingLeft: 8, paddingRight: 8 }}>
                              or
                            </Typography>
                          </div>
                          <Divider className={classes.grow} />
                        </div>
                      </div>
                      <div className={classes.background} style={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        right: 0,
                        transform: `translate3d(0, ${style.x * 129}px, 0)`
                      }}>
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
                        {['default', 'signUp'].includes(page) && <div style={{
                          display: 'flex',
                          marginTop: 8,

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
                            <div>
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
                              marginTop: 8,
                              opacity: page === 'forgotPassword' ? 0 : 1
                            }}>
                            Forgot password
                          </Button>
                        }
                      </div>
                    </div>
                  );
                }}
              </Motion>
            </div>

            <div style={{
              display: 'flex',
              marginTop: 16
            }}>
              <Button onClick={leftButtonAction} variant="text" className={classes.uncapitalized}>
                {formOpen && <ChevronLeft style={{fontSize: '1.3125rem', marginLeft: -12}} />}
                {formOpen ? 'Back' : 'New account'}
              </Button>
              <div style={{flex: 1}}/>
              <Button
                type="submit"
                disabled={pristine || submitting}
                variant="outlined"
                color="primary"
                className={classes.uncapitalized}>
                <Motion
                  defaultStyle={{x: 1}}
                  style={{x: spring(submitting ? 0 : 1, animConfig)}}>
                  {style =>
                    <div style={{ display: 'flex', opacity: style.x }}>
                      {submitButtonText}
                      {page === 'default' && <ChevronRight style={{fontSize: '1.3125rem', marginRight: -12}} />}
                    </div>
                  }
                </Motion>
                {submitting && <CircularProgress className={classes.colorTextSecondary} style={{
                    position: 'absolute'
                }} size={16} thickness={6}/>}
              </Button>
            </div>
          </div>
        </ResponsiveContainer>
      </form>
    );
  }
}


export default compose(
  withStyles(styles),
  reduxForm({
    form: 'auth/signin',
  }),
  firebaseConnect(),
  connect(
    state => ({
      authError: state.firebase.authError,
      page: state.auth.page,
      showPassword: state.auth.showPassword
    }),
    {
      change,
      setPage,
      setShowPassword,
      openDialog: openDialogAction
    }
  )
)(SignInForm)
