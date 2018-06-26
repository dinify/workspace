// @flow
import React from 'react';
import ReactDOM from 'react-dom';
import { Link } from 'react-router-dom';
import LogoText from 'icons/LogoText';
import Logo from 'icons/Logo';
import Person from 'icons/Person';
import Search from 'icons/Search';
import ShoppingCart from 'icons/ShoppingCart';
import Typography from 'web/components/Typography';

import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import ButtonBase from '@material-ui/core/ButtonBase';
import Divider from '@material-ui/core/Divider';
import MuiAppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Popover from '@material-ui/core/Popover';
import Grid from '@material-ui/core/Grid';
import Input from '@material-ui/core/Input';
import InputAdornment from '@material-ui/core/InputAdornment';
import Badge from '@material-ui/core/Badge';
import IconButton from '@material-ui/core/IconButton';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemText from '@material-ui/core/ListItemText';

import { withStyles } from '@material-ui/core/styles';
import withWidth, { isWidthUp } from '@material-ui/core/withWidth';

import { connect } from 'react-redux';
import { logoutInit } from 'ducks/auth/actions';
import { getLoggedUser } from 'ducks/user/selectors';
import { withStateHandlers } from 'recompose';

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
  user?: object,
  logout: func,
};

const AppBar = ({
  classes,
  position = 'sticky',
  width = 1000,
  children,
  user,
  accountMenuOpen,
  handleAccountMenuToggle,
  handleAccountMenuClose,
  setAnchor,
  anchor,
  setCartAnchor,
  cartMenuOpen,
  handleCartMenuToggle,
  handleCartMenuClose,
  cartAnchor,
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
        <div ref={node => { setCartAnchor(ReactDOM.findDOMNode(node)) }}>
          <IconButton
            onClick={handleCartMenuToggle}
            style={{marginRight: 16}}
            className={classes.margin}>
            <Badge badgeContent={4} color="primary">
              <ShoppingCart />
            </Badge>
          </IconButton>
          <Popover
            classes={{paper: classes.popover}}
            open={cartMenuOpen}
            anchorEl={anchor}
            onClose={handleCartMenuClose}
            anchorOrigin={{
              vertical: 'bottom',
              horizontal: 'right',
            }}
            transformOrigin={{
              vertical: 'top',
              horizontal: 'right',
            }}>
            <ListItem>
              <ListItemAvatar>
                <Avatar>
                  <ShoppingCart className={classes.secondary}/>
                </Avatar>
              </ListItemAvatar>
              <ListItemText
                primary="Cabbage kimchi"
                secondary="12.000 KD"
                primaryTypographyProps={{variant: 'body1'}}
                secondaryTypographyProps={{variant: 'caption'}}/>
            </ListItem>
            <ListItem>
              <ListItemAvatar>
                <Avatar>
                  <ShoppingCart className={classes.secondary}/>
                </Avatar>
              </ListItemAvatar>
              <ListItemText
                primary="Sundubu Chigye"
                secondary="5.000 KD"
                primaryTypographyProps={{variant: 'body1'}}
                secondaryTypographyProps={{variant: 'caption'}}/>
            </ListItem>
            <ListItem>
              <ListItemAvatar>
                <Avatar>
                  <ShoppingCart className={classes.secondary}/>
                </Avatar>
              </ListItemAvatar>
              <ListItemText
                primary="Bibimbap"
                secondary="6.000 KD"
                primaryTypographyProps={{variant: 'body1'}}
                secondaryTypographyProps={{variant: 'caption'}}/>
            </ListItem>
          </Popover>
        </div>

        {user &&
          <div>
            <ButtonBase
              aria-owns={anchor ? 'simple-menu' : null}
              aria-haspopup="true"
              onClick={handleAccountMenuToggle}
              style={{marginRight: -16}}
              className={classes.rounded}>
              <Avatar className={classes.avatar}>
                <Person />
              </Avatar>
              <Typography style={{marginLeft: 16, marginRight: 16}}>
                {user.name}
              </Typography>
            </ButtonBase>
            <Popover
              classes={{paper: classes.popover}}
              open={accountMenuOpen}
              anchorEl={anchor}
              onClose={handleAccountMenuClose}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'right',
              }}
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}>
              <Grid container style={{padding: 16}}>
                <Grid item>
                  <Avatar style={{width: 96, height: 96}}>
                    <Person style={{width: 56, height: 56}} />
                  </Avatar>
                </Grid>
                <Grid item style={{paddingLeft: 16, display: 'flex', flexDirection: 'column'}}>
                  <Typography variant="body1">{user.name}</Typography>
                  <Typography gutterBottom variant="caption">{user.email}</Typography>
                  <div style={{flexGrow: 1}}/>
                  <Button onClick={() => {handleAccountMenuClose(); logout()}} variant="outlined" fullWidth>Log out</Button>
                </Grid>
              </Grid>
            </Popover>
          </div>
        }

        {!user &&
          <div>
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
      <Divider ref={node => { setAnchor(ReactDOM.findDOMNode(node)) }} />
    </MuiAppBar>
  );
};

export default connect(
  state => ({
    user: getLoggedUser(state)
  }), {
    logout: logoutInit
  }
)(withStateHandlers(
  {
    accountMenuOpen: false,
    cartMenuOpen: false,
    anchor: null,
    cartAnchor: null
  },
  {
    setAnchor: () => (node) => ({anchor: node}),
    setCartAnchor: () => (node) => ({cartAnchor: node}),
    handleAccountMenuToggle: ({ accountMenuOpen }) => () => ({
      accountMenuOpen: !accountMenuOpen
    }),
    handleAccountMenuClose: () => () => ({ accountMenuOpen: false }),
    handleCartMenuToggle: ({ cartMenuOpen }) => () => ({
      cartMenuOpen: !cartMenuOpen
    }),
    handleCartMenuClose: () => () => ({ cartMenuOpen: false })
  }
)(withStyles(styles)(withWidth()(AppBar))));
