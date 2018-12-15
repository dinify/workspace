import React from 'react';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';
import { fbAuthInit } from 'ducks/auth/actions';
import { Field, reduxForm } from 'redux-form';
import { Link } from 'react-router-dom';
import { Motion, spring } from 'react-motion';
import ToggleIcon from 'material-ui-toggle-icon';
import FacebookLogin from 'react-facebook-login/dist/facebook-login-render-props';
import LogoText from 'icons/LogoText';
import FacebookLogo from 'icons/FacebookLogo';
import GoogleLogo from 'icons/GoogleLogo';
import Visibility from '@material-ui/icons/VisibilityRounded';
import VisibilityOff from '@material-ui/icons/VisibilityOffRounded';

import IconButton from '@material-ui/core/IconButton';
import InputAdornment from '@material-ui/core/InputAdornment';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import Button from '@material-ui/core/Button';
import Text from 'web/components/Inputs/Text';
import ResponsiveContainer from 'web/components/ResponsiveContainer';

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
  leftGutter: {
    marginLeft: theme.spacing.unit * 2,
  },
  googleButton: {
    justifyContent: 'start',
  },
  facebookButton: {
    justifyContent: 'start',
    color: 'rgba(255, 255, 255, 0.87)',
    backgroundColor: '#3b5998',
    boxShadow: 'none',
    '&:hover': {
      boxShadow: 'none',
      backgroundColor: '#546ca5', // #3b5998 + 0.12 white
    },
    '&:active': {
      boxShadow: 'none',
    },
    '&:focus': {
      boxShadow: 'none',
    },
  },
  uncapitalized: {
    textTransform: 'none',
  },
});

class SignInForm extends React.Component {
  state = {
    signingUp: false,
    showPassword: false
  }

  submit = (params) => {
    console.log(params);
  }

  render() {
    const {
      classes,
      loggedUserId,
      fbAuth,
    } = this.props;
    const {
      signingUp,
      showPassword
    } = this.state;
    const animConfig = { stiffness: 480, damping: 48 };

    return (
      <form onSubmit={this.submit} style={{height: '100vh'}}>
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
                Sign in
              </Typography>
              <Typography align="center" variant="caption">
                to access more features, like dining history, reviews and saving your favorites
              </Typography>
            </div>
            <div style={{maxHeight: 213, overflow: 'hidden'}}>
              <Motion
                defaultStyle={{x: 1}}
                style={{x: spring(signingUp ? 0 : 1, animConfig)}}>
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
                        <Button
                          fullWidth
                          className={classes.googleButton}
                          classes={{ label: classes.uncapitalized }}
                          variant="outlined"
                          onClick={() => {}}>
                          <GoogleLogo />
                          <span className={classes.leftGutter}>Continue with Google</span>
                        </Button>
                      </div>
                      <div style={{ paddingBottom: 16 }}>
                        <FacebookLogin
                          appId="123605498281814"
                          fields="name,email,gender,birthday"
                          scope="user_gender,user_birthday"
                          isMobile
                          disableMobileRedirect
                          callback={(res) => {
                            fbAuth({ fbRes: res })
                          }}
                          render={renderProps => (
                            <Button
                              fullWidth
                              className={classes.facebookButton}
                              classes={{ label: classes.uncapitalized }}
                              variant="contained"
                              onClick={() => renderProps.onClick()}>
                              <FacebookLogo />
                              <span className={classes.leftGutter}>Continue with Facebook</span>
                            </Button>
                          )}
                        /></div>
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
                style={{x: spring(signingUp ? 1 : 0, animConfig)}}>
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

                        <div style={{
                          display: 'flex',
                          marginTop: 8,
                          marginBottom: 8,
                        }}>
                          <Field
                            name="first_name"
                            component={Text}
                            componentProps={{
                              label: 'First name',
                              disabled: !signingUp,
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
                              disabled: !signingUp,
                              type: 'text',
                              variant: 'outlined',
                              name: 'lname',
                              autoComplete: 'family-name',
                              autocapitalization: 'words',
                              style: {marginLeft: 4}
                            }}
                          />
                        </div>
                        <Field
                          name="password"
                          component={Text}
                          componentProps={{
                            label: 'Password',
                            disabled: !signingUp,
                            type: showPassword ? 'text' : 'password',
                            fullWidth: true,
                            variant: 'outlined',
                            name: 'password',
                            autoComplete: 'new-password',
                            InputProps: {
                              endAdornment: (
                                <InputAdornment position="end">
                                  <IconButton
                                    disabled={!signingUp}
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
              <Button onClick={() => this.setState({signingUp: !signingUp})} variant="text" className={classes.uncapitalized}>
                {signingUp ? 'Back' : 'Create account'}
              </Button>
              <div style={{flex: 1}}/>
              <Button variant="outlined" color="primary" className={classes.uncapitalized}>
                Next
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
})(connect(
  state => ({
    loggedUserId: state.user.loggedUserId,
  }),
  {
    fbAuth: fbAuthInit,
  }
)(SignInForm)));

export default SignIn;
