import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { getContext } from 'recompose';
import { withStyles } from '@material-ui/core/styles';
import { toggleTheme as toggleThemeAction } from 'ducks/ui/actions';

import LogoText from '@dinify/common/dist/icons/LogoText';
import Logo from '@dinify/common/dist/icons/Logo';
import LightbulbToggle from 'web/components/LightbulbToggle';
import ChevronLeft from '@material-ui/icons/ChevronLeftRounded';
import Menu from '@material-ui/icons/MenuRounded';

import Divider from '@material-ui/core/Divider';
import MuiAppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';

import * as FN from '@dinify/common/dist/lib/FN';

const styles = theme => ({
  appBarDefault: {
    boxShadow: 'none',
    backgroundColor: theme.palette.background.default,
  },
  appBar: {

  },
  expand: theme.mixins.toolbar,
  primary: {
    color: theme.palette.text.primary,
    fill: theme.palette.text.primary
  },
  contrastText: {
    color: theme.palette.primary.contrastText,
    fill: theme.palette.primary.contrastText
  },
  themeButton: {
    color: theme.palette.text.secondary,
    backgroundColor: 'transparent',
    transition: 'background-color 0.1s linear',
    '&:active': {
      backgroundColor: theme.palette.divider
    }
  }
});

const AppBar = ({
  classes,
  position = 'static',
  color = 'default',
  children,
  setAnchor,
  toggleTheme,
  theme,
  history,
}) => {
  const logoWithText = true;
  const logo = (
    <Link to="/" style={{height: 24}}>
      {logoWithText && <LogoText className={color === 'default' ? classes.primary : classes.contrastText}/>}
      {!logoWithText && <Logo className={color === 'default' ? classes.primary : classes.contrastText}/>}
    </Link>
  );
  const iosInstalled = FN.isInstalled() && FN.getPlatform() === 'ios';
  const root = history.location.pathname === '/';

  return (
    <MuiAppBar
      position={position}
      color={color}
      className={color !== 'default' ? classes.appBar : classes.appBarDefault}>
      <Toolbar>
        {iosInstalled &&
          <IconButton
            style={{marginLeft: -16}}
            onClick={root ? () => { /* Open drawer */ } : history.goBack}>
            {root ? <Menu /> : <ChevronLeft />}
          </IconButton>
        }
        {!iosInstalled && logo}
        <div style={{flex: 1}} />
        <LightbulbToggle style={{marginRight: 16}} onChange={toggleTheme} checked={theme === 'light'} theme={theme}/>
        {children}
      </Toolbar>
      {color === 'default' ?
        <Divider ref={setAnchor} /> :
        <div ref={setAnchor} style={{width: '100%'}}/>
      }
    </MuiAppBar>
  );
};

export default connect(state => ({
    theme: state.ui.theme,
  }), {
    toggleTheme: toggleThemeAction,
  }
)(withStyles(styles)(getContext({
  router: PropTypes.object
})(AppBar)));
