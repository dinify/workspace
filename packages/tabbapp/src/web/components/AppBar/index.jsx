// @flow
import React from 'react';
import ReactDOM from 'react-dom';
import { Link } from 'react-router-dom';
import { withStateHandlers } from 'recompose';

import LogoText from 'icons/LogoText';
import Logo from 'icons/Logo';
import Search from 'icons/Search';

import Divider from '@material-ui/core/Divider';
import MuiAppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Input from '@material-ui/core/Input';
import InputAdornment from '@material-ui/core/InputAdornment';
import { withStyles } from '@material-ui/core/styles';
import withWidth, { isWidthUp } from '@material-ui/core/withWidth';

import Cart from './Cart';
import Account from './Account';

const styles = theme => ({
  appBar: {
    boxShadow: 'none',
    backgroundColor: theme.palette.background.default,
  },
  searchBar: {
    height: '100%',
    flex: 1,
    marginLeft: theme.spacing.unit * 3,
    [theme.breakpoints.down('md')]: {
      marginLeft: theme.spacing.unit * 2,
    },
  },
  searchBarRoot: {
    transition: theme.transitions.create('all', {
      duration: theme.transitions.duration.shorter,
    }),
    borderRadius: 4,
    paddingLeft: theme.spacing.unit,
    border: `1px solid transparent`,
    backgroundColor: theme.palette.type === 'light' ? 'rgba(0, 0, 0, 0.06)' : 'rgba(255, 255, 255, 0.06)',
    '&:hover': {
      borderBottom: `1px solid ${theme.palette.divider}`,
    },
  },
  searchBarFocused: {
    backgroundColor: theme.palette.type === 'light' ? '#fff' : '#000',
    border: `1px solid ${theme.palette.divider}`
  },
  primary: {
    color: theme.palette.text.primary
  },
  secondary: {
    color: theme.palette.text.secondary
  },
  rounded: {
    borderRadius: 20,
    border: `1px solid ${theme.palette.divider}`
  },
  popover: {
    boxShadow: theme.shadows[2]
  },
});

type AppBarProps = {
  classes: object,
  position: string,
  width: number,
  children?: React.Node,
};

const AppBar = ({
  classes,
  position = 'sticky',
  width = 1000,
  children,
  setAnchor,
  anchor,
}: AppBarProps) => {

  const logoWithText = isWidthUp('md', width);
  const logo = (
    <Link to="/">
      {logoWithText && <LogoText className={classes.primary} style={{width: 74}}/>}
      {!logoWithText && <Logo className={classes.primary}/>}
    </Link>
  );

  return (
    <MuiAppBar
      position={position}
      color="default"
      className={classes.appBar}>
      <Toolbar>
        {logo}
        {isWidthUp('sm', width) ?
          <div className={classes.searchBar} >
            <Input
              disableUnderline
              classes={{
                root: classes.searchBarRoot,
                focused: classes.searchBarFocused,
              }}
              placeholder="Search"
              className={classes.input}
              startAdornment={
                <InputAdornment position="start">
                  <Search className={classes.secondary} />
                </InputAdornment>
              }
              inputProps={{
                'aria-label': 'Search',
              }}/>
          </div> :
          <div style={{flex: 1}} />
        }
        {children}
        <Cart classes={classes} anchor={anchor} />
        <Account classes={classes} anchor={anchor} />
      </Toolbar>
      <Divider ref={node => { setAnchor(ReactDOM.findDOMNode(node)) }} />
    </MuiAppBar>
  );
};

export default withStateHandlers(
  {
    anchor: null,
  },
  {
    setAnchor: () => (node) => ({anchor: node}),
  }
)(withStyles(styles)(withWidth()(AppBar)));
