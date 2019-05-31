 
import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import { compose } from 'redux';
import { connect } from 'react-redux';

import ButtonBase from '@material-ui/core/ButtonBase';
import Typography from '@material-ui/core/Typography';
import Avatar from '@material-ui/core/Avatar';
import Person from '@material-ui/icons/PersonRounded';
import Image from 'web/components/Image';

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
  user,
  history
}) => {
  if (user.isEmpty) return null;
  return (
    <div>
      <ButtonBase
        aria-owns={anchor ? 'simple-menu' : null}
        aria-haspopup="true"
        onClick={() => {history.push('/account')}}
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
    </div>
  )
}

const enhance = compose(
  withStyles(styles),
  connect(
    state => ({
      user: state.firebase.auth,
    })
  )
)

export default enhance(Account);
