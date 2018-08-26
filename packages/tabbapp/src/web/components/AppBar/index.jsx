// @flow
import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { withStateHandlers, getContext } from 'recompose';

import LogoText from 'icons/LogoText';
import Logo from 'icons/Logo';
import Search from 'icons/Search';
import ChevronLeft from 'icons/ChevronLeft';
import Menu from 'icons/Menu';

import Divider from '@material-ui/core/Divider';
import MuiAppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Input from '@material-ui/core/Input';
import IconButton from '@material-ui/core/IconButton';
import InputAdornment from '@material-ui/core/InputAdornment';
import { withStyles } from '@material-ui/core/styles';
import withWidth, { isWidthUp } from '@material-ui/core/withWidth';
import * as FN from 'lib/FN';

import Account from './Account';

const styles = theme => ({
  appBarDefault: {
    boxShadow: 'none',
    backgroundColor: theme.palette.background.default,
  },
  appBar: {

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
  color: string,
  width: number,
  children?: React.Node,
};

const AppBar = ({
  classes,
  position = 'sticky',
  width = 1000,
  color = 'default',
  children,
  setAnchor,
  anchor,
  router,
  // cartItems, restaurants, checkedInRestaurant
}: AppBarProps) => {

  // const cartItemsList = FN.MapToList(cartItems);

  const logoWithText = isWidthUp('md', width);
  const logo = (
    <Link to="/">
      {logoWithText && <LogoText className={color === 'default' ? classes.primary : classes.contrastText} style={{width: 74}}/>}
      {!logoWithText && <Logo className={color === 'default' ? classes.primary : classes.contrastText}/>}
    </Link>
  );
  const iosInstalled = FN.isInstalled() && FN.getPlatform() === 'ios';
  // const activeRestaurant = checkedInRestaurant ? restaurants[checkedInRestaurant] : null

  const root = router.history.location.pathname === '/';
  // console.log(router.history.location.pathname);
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
        {/*
        {checkedInRestaurant ?
          <IconButton
            color={color}
            onClick={() => {router.history.push('/restaurant/'+activeRestaurant.subdomain)}}
            style={{marginRight: 16}}
          >
            <Restaurant />
          </IconButton>
          :
          <IconButton
            color={color}
            onClick={() => {router.history.push('/checkin')}}
            style={{marginRight: 16}}
            >
            <QRCodeScan />
          </IconButton>
        }
        <IconButton
          color={color}
          onClick={() => {router.history.push('/cart')}}
          style={{marginRight: 16}}>
          <Badge badgeContent={cartItemsList.length} color="primary">
            <ShoppingCart />
          </Badge>
        </IconButton>
        <IconButton
          color={color}
          onClick={() => {router.history.push('/bill')}}
          style={{marginRight: 16}}>
          <Receipt />
        </IconButton> */}
        <Account color={color} classes={classes} anchor={anchor} />
      </Toolbar>
      {color === 'default' ?
        <Divider ref={node => { setAnchor(ReactDOM.findDOMNode(node)) }} /> :
        <div ref={node => { setAnchor(ReactDOM.findDOMNode(node)) }} style={{width: '100%'}}/>
      }
    </MuiAppBar>
  );
};

export default connect(
  state => ({
    cartItems: state.cart.items,
    checkedInRestaurant: state.restaurant.checkedInRestaurant,
    restaurants: state.restaurant.all
  }),
)(withStateHandlers(
  {
    anchor: null,
  },
  {
    setAnchor: () => (node) => ({anchor: node}),
  }
)(withStyles(styles)(withWidth()(getContext({
  router: PropTypes.object
})(AppBar)))));
