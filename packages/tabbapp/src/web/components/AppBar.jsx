// @flow
import React from 'react';
import { Link } from 'react-router-dom';
import LogoText from 'icons/LogoText';
import Logo from 'icons/Logo';
import Button from '@material-ui/core/Button';
import Divider from '@material-ui/core/Divider';
import MuiAppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import { withStyles } from '@material-ui/core/styles';
import withWidth, { isWidthUp } from '@material-ui/core/withWidth';

import { connect } from 'react-redux';
import { logoutInit } from 'ducks/auth/actions';
import { getLoggedUser } from 'ducks/user/selectors';

const styles = theme => ({
  appBar: {
    boxShadow: 'none',
    backgroundColor: theme.palette.background.default,
  },
  flex: {
    flex: 1,
  },
  primary: {
    color: theme.palette.text.primary
  }
});

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

  const logo = (
    <Link to="/">
      {logoWithText && <LogoText className={classes.primary} style={{width: 74}}/>}
      {!logoWithText && <Logo className={classes.primary}/>}
    </Link>
  );
  const LoginLink = props => <Link to={{
          pathname: `/login`,
          state: { modal: true }
        }} {...props} />
  const SignupLink = props => <Link to={{
          pathname: `/signup`,
          state: { modal: true }
        }} {...props} />

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
        : <div>
            <Button
              component={LoginLink}
              variant="outlined"
              color="primary"
              style={{ marginRight: 24, marginLeft: 24 }}
            >
              Log in
            </Button>
            <Button
              component={SignupLink}
              variant="contained"
              color="primary"
            >
              Sign up
            </Button>
          </div>
        }
      </Toolbar>
      <Divider />
    </MuiAppBar>
  );
};

export default connect(
  state => ({
    user: getLoggedUser(state)
  }), {
    logout: logoutInit
  }
)(withStyles(styles)(withWidth()(AppBar)));
