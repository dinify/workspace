import React from 'react';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import DialogActions from '@material-ui/core/DialogActions';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
// import GoogleLogo from 'icons/GoogleLogo';
import FacebookLogo from 'icons/FacebookLogo';
import { fbAuthInit } from 'features/auth/actions';
import Login from 'web/components/Login';
import Signup from 'web/components/Signup';
import FacebookLogin from 'react-facebook-login/dist/facebook-login-render-props';

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
    marginLeft: theme.spacing(2),
  },
  googleButton: {
    marginTop: theme.spacing(1),
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

class OnboardingForm extends React.Component {
  state = {
    selectedTab: this.props.isSignup ? 1 : 0
  };

  componentWillReceiveProps(nextProps) {
    if (nextProps.open && !this.props.open) {
      this.setState({
        selectedTab: nextProps.isSignup ? 1 : 0
      });
    }
  }

  handleTabChange = (event, value) => {
    this.setState({ selectedTab: value });
  };

  handleChangeIndex = index => {
    this.setState({ selectedTab: index });
  };

  handleChangeTextField = name => event => {
    this.setState({
      [name]: event.target.value,
    });
  };

  handleMouseDownPassword = event => {
    event.preventDefault();
  };

  handleClickShowPassword = () => {
    this.setState({ showPassword: !this.state.showPassword });
  };

  render() {
    const { classes, fbAuth, location: { search }, history, loggedUserId } = this.props;
    if (loggedUserId) {
      history.push('/');
    }
    const { selectedTab } = this.state;
    // const title = selectedTab ? 'Next' : 'Log in';

    const query = search.match(/qr=([^&]*)/);
    let qr = null;
    if (query && query[1]) {
      qr = query[1];
    }

    return (
      <div>
        <Tabs
          fullWidth
          value={selectedTab}
          indicatorColor="primary"
          textColor="primary"
          onChange={this.handleTabChange}
        >
          <Tab label="Log in" />
          <Tab label="Sign up" />
        </Tabs>
        <div style={{ padding: 24, paddingBottom: 0 }}>

          {/*<div style={{ paddingBottom: 16 }}>
              <FacebookLogin
                appId="123605498281814"
                fields="name,email,gender,birthday"
                scope="user_gender,user_birthday"
                isMobile={true}
                disableMobileRedirect={true}
                callback={(res) => {
                  fbAuth({ fbRes: res, qr })
                }}
                render={renderProps => (
                  <Button
                    fullWidth
                    className={classes.facebookButton}
                    classes={{ label: classes.uncapitalized }}
                    variant="contained"
                    onClick={() => renderProps.onClick()}
                  >
                    <FacebookLogo />
                    <span className={classes.leftGutter}>Continue with Facebook</span>
                  </Button>
                )}
              /></div>
            */}


          {/*
          <div style={{ paddingBottom: 16 }}>
            <Button
              fullWidth
              className={classes.googleButton}
              classes={{ label: classes.uncapitalized }}
              variant="outlined"
              onClick={() => {}}
            >
              <GoogleLogo />
              <span className={classes.leftGutter}>Continue with Google</span>
            </Button>
          </div>


          <div className={classes.flex}>
            <Divider className={classes.grow} />
            <Typography
              variant="caption"
              component="span"
              style={{ paddingLeft: 8, paddingRight: 8 }}
            >
              or
            </Typography>
            <Divider className={classes.grow} />
          </div>
          */}
          {selectedTab === 0 &&
            <Login
              qr={qr}
              submitComponent={
                <DialogActions>
                  <Button type="submit" color="primary">
                    Log in
                  </Button>
                </DialogActions>
              }
            />
          }
          {selectedTab === 1 &&
            <Signup
              qr={qr}
              submitComponent={
                <DialogActions>
                  <Button type="submit" color="primary">
                    Sign up
                  </Button>
                </DialogActions>
              }
            />
          }
        </div>
      </div>
    );
  }
}

OnboardingForm = connect(
  (state) => ({
    loggedUserId: state.user.loggedUserId,
  }),
  {
    fbAuth: fbAuthInit,
  },
)(OnboardingForm);

export default withStyles(styles, { withTheme: true })(OnboardingForm);
