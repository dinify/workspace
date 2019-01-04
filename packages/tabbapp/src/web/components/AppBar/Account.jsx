 // @flow
import React from 'react';
import { withStateHandlers } from 'recompose';
import { withStyles } from '@material-ui/core/styles';

import ButtonBase from '@material-ui/core/ButtonBase';
import Typography from '@material-ui/core/Typography';
import Avatar from '@material-ui/core/Avatar';
import Person from '@material-ui/icons/PersonRounded';
import Image from 'web/components/Image';

import AccountDialog from 'web/components/AccountDialog';

const styles = theme => ({
  rounded: {
    borderRadius: 20,
    border: `1px solid ${theme.palette.divider}`
  }
});

const Account = ({
  anchor,
  handleAccountMenuToggle,
  classes,
  auth,
  accountMenuOpen,
  handleAccountMenuClose,
}) => {
  const { user } = auth;
  if (!user) return null;
  return (
    <div>
      <ButtonBase
        aria-owns={anchor ? 'simple-menu' : null}
        aria-haspopup="true"
        onClick={handleAccountMenuToggle}
        style={{marginRight: -16}}
        className={classes.rounded}>
        <Avatar className={classes.avatar}>
          {user.photoURL ? <Image aspect={1} image={user.photoURL} title={user.displayName} /> : <Person />}
        </Avatar>
        <Typography
          color='inherit'
          style={{marginLeft: 16, marginRight: 16}}>
          {user.displayName}
        </Typography>
      </ButtonBase>
      <AccountDialog auth={auth} open={accountMenuOpen} onClose={handleAccountMenuClose}/>
      {/* <Popover
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
            <Typography >{user.name}</Typography>
            <Typography gutterBottom variant="caption">{user.email}</Typography>
            <div style={{flexGrow: 1}}/>
            <Button onClick={() => {handleAccountMenuClose(); logout()}} variant="outlined" fullWidth>Log out</Button>
          </Grid>
        </Grid>
      </Popover> */}
    </div>
  )
}

export default withStateHandlers(
  {
    accountMenuOpen: false,
  },
  {
    handleAccountMenuToggle: ({ accountMenuOpen }) => () => ({
      accountMenuOpen: !accountMenuOpen
    }),
    handleAccountMenuClose: () => () => ({ accountMenuOpen: false }),
  }
)(withStyles(styles)(Account));
