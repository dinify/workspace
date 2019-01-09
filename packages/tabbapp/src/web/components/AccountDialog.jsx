import React from 'react';
import { compose } from 'redux'
import { withFirebase } from 'react-redux-firebase'
import { withStyles } from '@material-ui/core/styles';
import Person from '@material-ui/icons/PersonRounded';
import Divider from '@material-ui/core/Divider';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogActions from '@material-ui/core/DialogActions';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Image from 'web/components/Image';

const styles = theme => ({
  typeChip: {
    height: 24,
    borderRadius: 12,
    paddingLeft: 8,
    paddingRight: 8,
    display: 'flex',
    alignItems: 'center'
  },
  manager: {
    backgroundColor: theme.palette.primary.main,
    color: 'rgba(255, 255, 255, 1)',
  },
  waiter: {
    backgroundColor: theme.palette.secondary.main,
    color: 'rgba(255, 255, 255, 1)',
  }
});

const localizedType = {
  manager: 'Manager',
  waiter: 'Waiter'
}

const AccountDialog = ({
  classes,
  onClose,
  user,
  firebase,
  ...other
}) => {
  return (
    <Dialog onClose={onClose} aria-labelledby="account-dialog" {...other}>
      <DialogContent>
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center'
        }}>
          <Avatar style={{width: 96, height: 96}}>
            {user.avatarUrl ?
              <Image aspect={1} image={user.avatarUrl} title={user.displayName} /> :
              <Person style={{width: 56, height: 56}} />
            }
          </Avatar>
          <Typography style={{marginTop: 8}} variant="h5">
            {user.displayName}
          </Typography>
          <Typography variant="subtitle1">
            {user.email}
          </Typography>
        </div>
        {user.claims && user.claims.roles && (
          <div>
            <Divider style={{marginTop: 16}}/>
            <Typography variant="overline" color="textSecondary">
              Roles
            </Typography>

            {user.claims.roles.restaurant && (
              <ListItem style={{padding: 0}}>
                <Avatar className={classes[user.claims.roles.restaurant.type]}>
                  <Person />
                </Avatar>
                <ListItemText primary={localizedType[user.claims.roles.restaurant.type]} secondary="at Korea Grill" />
              </ListItem>
            )}
          </div>
        )}
      </DialogContent>
      <DialogActions>
        <Button onClick={() => {
          firebase.logout();
          onClose();
        }} color="primary">
          Log out
        </Button>
        <Button onClick={() => {
          onClose()
        }} color="primary">
          Cancel
        </Button>
      </DialogActions>
    </Dialog>
  );
}

const enhance = compose(
  withFirebase,
  withStyles(styles)
)

export default enhance(AccountDialog);
