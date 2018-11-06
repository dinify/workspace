// @flow
import React from 'react';
import SnackbarMUI from '@material-ui/core/Snackbar';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import Close from 'icons/Close';

export default class Snackbar extends React.Component {
  render() {
    const {
      snackbarObject: {
        id,
        message,
        actionTitle,
        redirect,
        open,
      },
      historyPush,
      hideSnackbar
    } = this.props;
    return (
      <SnackbarMUI
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
        autoHideDuration={6000}
        open={open}
        onClose={() => hideSnackbar({ id })}
        ContentProps={{
          'aria-describedby': 'message-id',
        }}
        message={<span id="message-id">{message || ''}</span>}
        action={[
          actionTitle && redirect ?<Button key="menu" color="inherit" size="small" onClick={() => historyPush(redirect)}>
            {actionTitle}
          </Button> : null,
          <IconButton
            key="close"
            aria-label="Close"
            color="inherit"
            onClick={() => hideSnackbar({ id })}>
            <Close />
          </IconButton>
        ]}
      />
    )
  }
}
