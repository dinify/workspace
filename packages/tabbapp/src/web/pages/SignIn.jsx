import React from 'react';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';
import { fbAuthInit } from 'ducks/auth/actions';
import AppBar from 'web/components/AppBar';
import Typography from 'web/components/Typography';
import * as FN from 'tabb-front/dist/lib/FN';

const styles = theme => ({

});

class SignIn extends React.Component {
  render() {
    const {
      classes,
      loggedUserId,
      fbAuth,
    } = this.props;
    const iosInstalled = FN.isInstalled() && FN.getPlatform() === 'ios';
    return (
      <div>
        {!iosInstalled && <AppBar position="static"/>}
        <Typography>
          
        </Typography>
      </div>
    );
  }
}


SignIn = connect(
  state => ({
    loggedUserId: state.user.loggedUserId,
  }),
  {
    fbAuth: fbAuthInit,
  }
)(SignIn)

export default withStyles(styles)(SignIn);
