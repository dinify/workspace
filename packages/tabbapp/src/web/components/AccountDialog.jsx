import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Person from '@material-ui/icons/PersonRounded';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogActions from '@material-ui/core/DialogActions';
import Image from 'web/components/Image';

const styles = theme => ({

});

const AccountDialog = ({
  classes,
  onClose,
  auth,
  ...other
}) => {
  const { user } = auth;
  return (
    <Dialog onClose={onClose} aria-labelledby="account-dialog" {...other}>
      <DialogContent>
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center'
        }}>
          <Avatar style={{width: 96, height: 96}}>
            {user.photoURL ?
              <Image aspect={1} image={user.photoURL} title={user.displayName} /> :
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
      </DialogContent>
      <DialogActions>
        <Button onClick={() => {
          auth.logout();
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

export default withStyles(styles)(AccountDialog);
