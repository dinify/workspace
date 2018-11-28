// @flow
import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import SnackbarMUI from '@material-ui/core/Snackbar';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import Close from '@material-ui/icons/CloseRounded';

const styles = theme => ({
  avoidBotomNav: {
    bottom: 56,
    zIndex: 1200
  },
  primaryLight: {
    color: theme.palette.primary.light
  }
});

class Snackbar extends React.Component {
  render() {
    const {
      snackbarObject: {
        id,
        message,
        actionTitle,
        redirect,
        duration = 5000,
        open,
      },
      historyPush,
      hideSnackbar,
      classes
    } = this.props;
    return (
      <SnackbarMUI
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
        // autoHideDuration={duration}
        open={open}
        onClose={() => hideSnackbar({ id })}
        classes={{
          root: classes.avoidBotomNav
        }}
        ContentProps={{
          'aria-describedby': 'message-id',
        }}
        message={<span id="message-id">{message || ''}</span>}
        action={[
          actionTitle && redirect ?<Button className={classes.primaryLight} key="menu" color="inherit" size="small" onClick={() => historyPush(redirect)}>
            {actionTitle}
          </Button> : null,
          /* <IconButton
            key="close"
            aria-label="Close"
            color="inherit"
            onClick={() => hideSnackbar({ id })}>
            <Close />
          </IconButton> */
        ]}
      />
    )
  }
}

export default withStyles(styles)(Snackbar);
