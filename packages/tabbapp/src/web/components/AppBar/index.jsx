// @flow
import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { getContext } from 'recompose';
import { withStyles } from '@material-ui/core/styles';

import LogoText from 'icons/LogoText';
import Logo from 'icons/Logo';
import ChevronLeft from '@material-ui/icons/ChevronLeftRounded';
import Menu from '@material-ui/icons/MenuRounded';

import Divider from '@material-ui/core/Divider';
import MuiAppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';

import * as FN from 'tabb-front/dist/lib/FN';

import Account from './Account';

const styles = theme => ({
  appBarDefault: {
    boxShadow: 'none',
    backgroundColor: theme.palette.background.default,
  },
  appBar: {

  },
  expand: theme.mixins.toolbar,
  primary: {
    color: theme.palette.text.primary
  },
  contrastText: {
    color: theme.palette.primary.contrastText
  },
  secondary: {
    color: theme.palette.text.secondary
  },
});

const AppBar = ({
  classes,
  position = 'static',
  color = 'default',
  children,
  setAnchor,
  router,
}) => {
  const logoWithText = true;
  const logo = (
    <Link to="/">
      {logoWithText && <LogoText className={color === 'default' ? classes.primary : classes.contrastText} style={{width: 74}}/>}
      {!logoWithText && <Logo className={color === 'default' ? classes.primary : classes.contrastText}/>}
    </Link>
  );
  const iosInstalled = FN.isInstalled() && FN.getPlatform() === 'ios';
  const root = router.history.location.pathname === '/';

  return (
    <MuiAppBar
      position={position}
      color={color}
      className={color !== 'default' ? classes.appBar : classes.appBarDefault}>
      <Toolbar>
        {iosInstalled &&
          <IconButton
            style={{marginLeft: -16}}
            onClick={root ? () => { /* Open drawer */ } : router.history.goBack}>
            {root ? <Menu /> : <ChevronLeft />}
          </IconButton>
        }
        {!iosInstalled && logo}
        <div style={{flex: 1}} />
        {children}
      </Toolbar>
      {color === 'default' ?
        <Divider ref={setAnchor} /> :
        <div ref={setAnchor} style={{width: '100%'}}/>
      }
    </MuiAppBar>
  );
};

export default withStyles(styles)(getContext({
  router: PropTypes.object
})(AppBar));
