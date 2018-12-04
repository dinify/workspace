import React from 'react';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';
import { fbAuthInit } from 'ducks/auth/actions';
import { Field, reduxForm } from 'redux-form';
import { Link } from 'react-router-dom';
import FacebookLogin from 'react-facebook-login/dist/facebook-login-render-props';
import LogoText from 'icons/LogoText';
import FacebookLogo from 'icons/FacebookLogo';
import GoogleLogo from 'icons/GoogleLogo';

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
  submit = (params) => {
    console.log(params);
  }

  render() {
    const {
      classes,
      loggedUserId,
      fbAuth,
    } = this.props;

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


            <Field
              name="email"
              component={Text}
              componentProps={{
                label: 'Continue with email',
                type: 'email',
                fullWidth: true,
                variant: 'outlined',
                name: 'email',
                /* autocomplete: 'username',
                spellcheck: false,
                tabindex: '0',
                autocapitalize: 'none' */
              }}
            />
            <div style={{
              display: 'flex',
              marginTop: 16
            }}>
              <Button variant="text" className={classes.uncapitalized}>
                Create account
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
