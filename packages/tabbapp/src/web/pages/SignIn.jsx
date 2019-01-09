import React from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux'
import { withFirebase, isLoaded, isEmpty } from 'react-redux-firebase'
import { withStyles } from '@material-ui/core/styles';
import { fbAuthInit, googleAuthInit } from 'ducks/auth/actions';
import { Field, reduxForm, SubmissionError } from 'redux-form';
import { Link } from 'react-router-dom';
import { Motion, spring } from 'react-motion';
import ToggleIcon from 'material-ui-toggle-icon';
import LogoText from 'icons/LogoText';
import Visibility from '@material-ui/icons/VisibilityRounded';
import VisibilityOff from '@material-ui/icons/VisibilityOffRounded';
import CircularProgress from '@material-ui/core/CircularProgress';

import IconButton from '@material-ui/core/IconButton';
import InputAdornment from '@material-ui/core/InputAdornment';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import Button from '@material-ui/core/Button';
import Text from 'web/components/Inputs/Text';
import ResponsiveContainer from 'web/components/ResponsiveContainer';
import GoogleButton from 'web/components/GoogleButton';
import FacebookButton from 'web/components/FacebookButton';

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
  }
});

class SignInForm extends React.Component {
  state = {
    page: 'default',
    showPassword: false,
  }

  signIn = params => {
    const { auth } = this.props;
    const { email, password, first_name, last_name } = params;
    const errors = {};
    if (!email) {
      errors.email = 'Required';
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(email)) {
      errors.email = 'Invalid email address';
    }

    if (!password) errors.password = 'Required';
    if (Object.keys(errors).length !== 0) throw new SubmissionError(errors);
    return auth.loginUser(email, password).then(credential => {
      console.log(credential);
      // TODO: store the rest of the form values (first name, last name, etc)
      // in our own database linked with uid
    }).catch(error => {
      switch (error.code) {
        case 'auth/invalid-email':
          errors.email = 'The email address is invalid';
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
          console.log(error);
          break;
      }
      if (Object.keys(errors).length !== 0) throw new SubmissionError(errors);
    });
  }

  signUp = params => {
    const { auth } = this.props;
    const { email, password, first_name, last_name } = params;
    const errors = {};
    if (!email) {
      errors.email = 'Required';
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(email)) {
      errors.email = 'Invalid email address';
    }
    if (!password) errors.password = 'Required';
    if (!first_name) errors.first_name = 'Required';
    if (!last_name) errors.last_name = 'Required';
    if (Object.keys(errors).length !== 0) throw new SubmissionError(errors);
    return auth.createUser(email, password).then(result => {
      const user = result.user;
      user.updateProfile({displayName: `${first_name} ${last_name}`}).then(() => {
        auth.updateUser(user);
      });
      // TODO: store the rest of the form values (first name, last name, etc)
      // in our own database linked with uid
    }).catch(error => {
      switch (error.code) {
        case 'auth/invalid-email':
          errors.email = 'The email address is invalid';
          break;
        case 'auth/email-already-in-use':
          errors.email = 'The email address is already in use';
          break;
        case 'auth/weak-password':
          errors.password = 'The password is too weak';
          break;
        default:
          console.log(error);
          break;
      }
      if (Object.keys(errors).length !== 0) throw new SubmissionError(errors);
    });
  }

  decide = params => {
    const { auth } = this.props;
    const { email } = params;
    const errors = {};
    if (!email) {
      errors.email = 'Required';
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(email)) {
      errors.email = 'Invalid email address';
    }
    if (Object.keys(errors).length !== 0) throw new SubmissionError(errors);
    return auth.fetchMethods(email).then(methods => {
      console.log(methods);
      if (methods.length === 0) {
        this.setState({page: 'signUp'});
      }
      else {
        let found = false;
        for (let i = 0; i < methods.length; i += 1) {
          const method = methods[i];
          if (method === 'password') {
            this.setState({page: 'signIn'});
            found = true;
          }
        }
        // present user with dialog with options
        if (!found) {
          auth.prompt('account-exists', {
            attempt: 'password',
            method: methods[0],
            email,
            action: () => {
              return auth.loginSocial(methods[0]);
            }
          });
        }
      }
    });
  }

  render() {
    const {
      classes,
      loggedUserId,
      fbAuth,
      googleAuth,
      handleSubmit,
      pristine,
      submitting,
      firebase,
      auth
    } = this.props;
    const {
      showPassword,
      page,
    } = this.state;
    const animConfig = { stiffness: 480, damping: 48 };

    const formOpen = page !== 'default';

    let submitButtonText = 'Next';
    let submitFc = this.decide;
    let formTitle = 'Sign in';
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
                to access more features, like dining history, reviews and saving your favorites
              </Typography>
            </div>
            <div style={{maxHeight: 213, overflow: 'hidden'}}>
              <Motion
                defaultStyle={{x: 1}}
                style={{x: spring(formOpen ? 0 : 1, animConfig)}}>
                {style =>
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
                      <div style={{ paddingBottom: 16 }}>
                        <GoogleButton onClick={() => firebase.login({ provider: 'google', type: 'popup' })} />
                      </div>
                      <div style={{ paddingBottom: 16 }}>
                        <FacebookButton onClick={() => firebase.login({ provider: 'facebook', type: 'popup' })} />
                      </div>
                      <div style={{marginBottom: 16}} className={classes.flex}>
                        <Divider className={classes.grow} />
                        <Typography
                          variant="caption"
                          component="span"
                          color="textSecondary"
                          style={{ paddingLeft: 8, paddingRight: 8 }}>
                          or
                        </Typography>
                        <Divider className={classes.grow} />
                      </div>
                    </div>
                  </div>
                }
              </Motion>
              <Motion
                defaultStyle={{x: 0}}
                style={{x: spring(formOpen ? 1 : 0, animConfig)}}>
                {style => {
                  const baseScale = (56 + 8) / 192;
                  const currentScale = baseScale + (style.x * (1 - baseScale));
                  return (
                    <div ref={node => {this.signupSection = node}} style={{
                      willChange: 'transform',
                      transformOrigin: 'top center',
                      overflow: 'hidden',
                      transform: `scale(1, ${currentScale}) translate3d(0, ${-style.x * 152}px, 0)`
                    }}>
                      <div ref={node => {this.socialSection = node}} style={{
                        transformOrigin: 'top center',
                        transform: `scale(1, ${1 / currentScale}) translate3d(0, 0, 0)`
                      }}>
                        <Field
                          name="email"
                          component={Text}
                          componentProps={{
                            style: {marginTop: 8},
                            label: 'Continue with email',
                            type: 'email',
                            fullWidth: true,
                            variant: 'outlined',
                            name: 'email',
                            autocapitalization: 'none',
                            autoComplete: 'email',
                            /* spellcheck: false,
                            tabindex: '0',
                            autocapitalize: 'none' */
                          }}
                        />

                        {page !== 'signIn' && <div style={{
                          display: 'flex',
                          marginTop: 8,

                        }}>
                          <Field
                            name="first_name"
                            component={Text}
                            componentProps={{
                              label: 'First name',
                              disabled: !formOpen,
                              type: 'text',
                              variant: 'outlined',
                              name: 'fname',
                              autoComplete: 'given-name',
                              autocapitalization: 'words',
                              style: {marginRight: 4}
                            }}
                          />
                          <Field
                            name="last_name"
                            component={Text}
                            componentProps={{
                              label: 'Last name',
                              disabled: !formOpen,
                              type: 'text',
                              variant: 'outlined',
                              name: 'lname',
                              autoComplete: 'family-name',
                              autocapitalization: 'words',
                              style: {marginLeft: 4}
                            }}
                          />
                        </div>}
                        <Field
                          name="password"
                          component={Text}
                          componentProps={{
                            label: 'Password',
                            style: {marginTop: 8},
                            disabled: !formOpen,
                            type: showPassword ? 'text' : 'password',
                            fullWidth: true,
                            variant: 'outlined',
                            name: 'password',
                            autoComplete: page === 'signUp' ? 'new-password' : 'current-password',
                            InputProps: {
                              endAdornment: (
                                <InputAdornment position="end">
                                  <IconButton
                                    disabled={!formOpen}
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
              <Button onClick={() => this.setState({page: formOpen ? 'default' : 'signUp'})} variant="text" className={classes.uncapitalized}>
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
                    <div style={{ opacity: style.x }}>{submitButtonText}</div>
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

const SignIn = withStyles(styles)(reduxForm({
  form: 'auth/signin',
})(SignInForm));

export default compose(
  withFirebase,
  connect(
    state => ({
      auth: state.firebase.auth,
      loggedUserId: state.user.loggedUserId
    })
  )
)(SignIn)
