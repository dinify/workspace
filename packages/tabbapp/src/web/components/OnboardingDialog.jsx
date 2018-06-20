import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import InputLabel from '@material-ui/core/InputLabel';
import InputAdornment from '@material-ui/core/InputAdornment';
import IconButton from '@material-ui/core/IconButton';
import Input from '@material-ui/core/Input';
import FormControl from '@material-ui/core/FormControl';
import SwipeableViews from 'react-swipeable-views';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import GoogleLogo from 'icons/GoogleLogo';
import FacebookLogo from 'icons/FacebookLogo';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';

import Login from 'web/components/Login';

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
    marginTop: theme.spacing.unit,
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

class OnboardingDialog extends React.Component {
  state = {
    email: '',
    name: '',
    password: '',
    selectedTab: this.props.isSignup ? 1 : 0,
  };

  componentWillReceiveProps(nextProps) {
    this.setState({
      selectedTab: nextProps.isSignup ? 1 : 0,
      title: nextProps.isSignup ? 'Sign up' : 'Log in',
    });
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
    const { classes } = this.props;
    let title = this.state.selectedTab ? 'Next' : 'Log in';

    let emailPasswordInput = (
      <div>
        <div style={{ paddingBottom: 8 }}>
          <TextField
            autoFocus={!this.state.email}
            required={this.state.selectedTab === 1}
            fullWidth
            type="email"
            id="email"
            label="Email"
            value={this.state.email}
            onChange={this.handleChangeTextField('email')}
          />
        </div>
        <div style={this.state.selectedTab === 1 ? { paddingBottom: 8 } : {}}>
          <FormControl fullWidth required={this.state.selectedTab === 1}>
            <InputLabel htmlFor="adornment-password">Password</InputLabel>
            <Input
              id="adornment-password"
              autoFocus={this.state.email && !this.state.password}
              type={this.state.showPassword ? 'text' : 'password'}
              value={this.state.password}
              onChange={this.handleChangeTextField('password')}
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    aria-label="Toggle password visibility"
                    onClick={this.handleClickShowPassword}
                    onMouseDown={this.handleMouseDownPassword}
                  >
                    {this.state.showPassword ? (
                      <VisibilityOff className={classes.small} />
                    ) : (
                      <Visibility className={classes.small} />
                    )}
                  </IconButton>
                </InputAdornment>
              }
            />
          </FormControl>
        </div>
      </div>
    );

    return (
      <Dialog
        open={this.props.open}
        onClose={this.props.onClose}
        aria-labelledby={title}
      >
        <Tabs
          fullWidth
          value={this.state.selectedTab}
          indicatorColor="primary"
          textColor="primary"
          onChange={this.handleTabChange}
        >
          <Tab label="Log in" />
          <Tab label="Sign up" />
        </Tabs>
        <div style={{ padding: 24, paddingBottom: 0 }}>
          <div>
            <Button
              fullWidth
              className={classes.facebookButton}
              classes={{ label: classes.uncapitalized }}
              variant="contained"
              onClick={() => {}}
            >
              <FacebookLogo />
              <span className={classes.leftGutter}>Continue with Facebook</span>
            </Button>
          </div>
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
          <Login
            submitComponent={
              <DialogActions>
                <Button type="submit" color="primary">
                  Log in
                </Button>
              </DialogActions>
            }
          />
        </div>
      </Dialog>
    );
  }
}

export default withStyles(styles, { withTheme: true })(OnboardingDialog);
