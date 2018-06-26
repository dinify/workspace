// @flow
import React from 'react';
import { withStateHandlers } from 'recompose';
import { Link } from 'react-router-dom';
import ButtonBase from '@material-ui/core/ButtonBase';
import Typography from 'web/components/Typography';
import Avatar from '@material-ui/core/Avatar';
import Person from 'icons/Person';
import Popover from '@material-ui/core/Popover';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import { connect } from 'react-redux';
import { logoutInit } from 'ducks/auth/actions';
import { getLoggedUser } from 'ducks/user/selectors';

const LoginLink = props => <Link to={{
    pathname: `/login`,
    state: { modal: true }
  }} {...props} />

const SignupLink = props => <Link to={{
    pathname: `/signup`,
    state: { modal: true }
  }} {...props} />

const Account = ({
  anchor,
  handleAccountMenuToggle,
  classes,
  user,
  accountMenuOpen,
  handleAccountMenuClose,
  logout
}) => {
  if (!user) {
    return (
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
    )
  }
  return (
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
  )
}

export default connect(
  state => ({
    user: getLoggedUser(state)
  }), {
    logout: logoutInit
  }
)(withStateHandlers(
  {
    accountMenuOpen: false,
  },
  {
    handleAccountMenuToggle: ({ accountMenuOpen }) => () => ({
      accountMenuOpen: !accountMenuOpen
    }),
    handleAccountMenuClose: () => () => ({ accountMenuOpen: false }),
  }
)(Account));
