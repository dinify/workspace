import React from 'react';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import Divider from '@material-ui/core/Divider';
import MuiAppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import { withStyles } from '@material-ui/core/styles';
import withWidth, { isWidthUp } from '@material-ui/core/withWidth';
import OnboardingDialog from 'web/components/OnboardingDialog';
import SVG from 'react-inlinesvg';

const styles = theme => ({
  appBar: {
    boxShadow: 'none',
    backgroundColor: theme.palette.background.default
  },
  flex: {
    flex: 1
  },
  logo: {
    width: '24px',
    maxWidth: '24px',
    opacity: '0.87',
    display: 'inline-block'
  },
  logoText: {
    width: '74px',
    maxWidth: '74px',
    opacity: '0.87',
    display: 'inline-block'
  }
});

class AppBar extends React.Component {
  state = {
    onboardingDialog: {
      open: false,
      isSignup: false
    },
  }

  handleSignupClick = () => {
    this.setState({
      onboardingDialog: {
        open: true,
        isSignup: true
      }
    });
  }

  handleLoginClick = () => {
    this.setState({
      onboardingDialog: {
        open: true,
        isSignup: false
      }
    });
  }

  handleOnboardingClose = () => {
    let onboardingDialog = this.state.onboardingDialog;
    onboardingDialog.open = false;
    this.setState({onboardingDialog});
  }

  render() {
    const { classes, position } = this.props;

    let logoWithText = isWidthUp('md', this.props.width);
    //console.log(logoWithText);

    let logo = (
      <a href="#" className={logoWithText ? classes.logoText : classes.logo}>
        <SVG
          className={logoWithText ? classes.logoText : classes.logo}
          src={"http://images.tabb.global/brand/" + (this.props.dark ?
            (logoWithText ? "logo-text.svg" : "logo.svg") :
            (logoWithText ? "logo-text-dark.svg" : "logo-dark.svg"))}>
          <img src={"http://images.tabb.global/brand/" + (this.props.dark ?
            (logoWithText ? "logo-text.png" : "logo.png") :
            (logoWithText ? "logo-text-dark.png" : "logo-dark.png"))}/>
        </SVG>
      </a>
    );

    return (
      <MuiAppBar position={position} color="default" className={classes.appBar}>
        <Toolbar>
          {logo}
          <div className={classes.flex}></div>
          {this.props.children}
          <Button onClick={this.handleLoginClick} variant="outlined" color="primary" style={{marginRight: '24px', marginLeft: '24px'}}>Log in</Button>
          <Button onClick={this.handleSignupClick} variant="contained" color="primary">Sign up</Button>
        </Toolbar>
        <Divider/>
        <OnboardingDialog isSignup={this.state.onboardingDialog.isSignup} open={this.state.onboardingDialog.open} onClose={this.handleOnboardingClose}/>
      </MuiAppBar>
    )
  }
}

AppBar.propTypes = {
  position: PropTypes.string
};

AppBar.defaultProps = {
  position: "sticky"
};

export default withStyles(styles)(withWidth()(AppBar));
