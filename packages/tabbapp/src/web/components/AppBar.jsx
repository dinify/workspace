// @flow
import React from 'react';
import { Link } from 'react-router';
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
    backgroundColor: theme.palette.background.default,
  },
  flex: {
    flex: 1,
  },
  logo: {
    width: '24px',
    maxWidth: '24px',
    opacity: '0.87',
    display: 'inline-block',
  },
  logoText: {
    width: '74px',
    maxWidth: '74px',
    opacity: '0.87',
    display: 'inline-block',
  },
});

const logoFiles = {
  shape: {
    dark: 'logo-dark.svg',
    light: 'logo.svg',
  },
  text: {
    dark: 'logo-text-dark.svg',
    light: 'logo-text.svg',
  },
};

type AppBarProps = {
  classes: object,
  position: string,
  width: number,
  dark: boolean,
  children?: React.Node,
  user?: object,
  logout: func,
};

const AppBar = ({
  classes,
  position = 'sticky',
  width = 1000,
  dark = false,
  children,
  user,
  logout,
}: AppBarProps) => {
  const logoWithText = isWidthUp('md', width);
  const logoFile = logoFiles[logoWithText ? 'text' : 'shape'][dark ? 'light' : 'dark'];
  const logoURL = `http://images.tabb.global/brand/${logoFile}`;
  const logo = (
    <Link to="/" className={logoWithText ? classes.logoText : classes.logo}>
      <SVG
        className={logoWithText ? classes.logoText : classes.logo}
        src={logoURL}
      >
        <img src={logoURL} alt="TABB" />
      </SVG>
    </Link>
  );
  return (
    <MuiAppBar position={position} color="default" className={classes.appBar}>
      <Toolbar>
        {logo}
        <div className={classes.flex} />
        {children}
        {user ?
          <div>
            {user.name}
            <Button onClick={logout}>Logout</Button>
          </div>
        :
          <Link to="/login">
            <Button
              variant="outlined"
              color="primary"
              style={{ marginRight: '24px', marginLeft: '24px' }}
            >
              Log in
            </Button>
            <Button variant="contained" color="primary">
              Sign up
            </Button>
          </Link>
        }
      </Toolbar>
      <Divider />
      <OnboardingDialog isSignup={true} open={false} onClose={() => ({})} />
    </MuiAppBar>
  );
};

export default withStyles(styles)(withWidth()(AppBar));
