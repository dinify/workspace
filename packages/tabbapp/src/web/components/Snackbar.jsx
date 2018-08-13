// @flow
import React from 'react';
import SnackbarMUI from '@material-ui/core/Snackbar';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import Close from 'icons/Close';

export default class Snackbar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      closed: false
    };
  }
  render() {
    const {
      message,
      action,
      actionTitle,
    } = this.props;
    let { initiated } = this.props;
    if (this.state.closed) initiated = false;
    return (
      <SnackbarMUI
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
        open={initiated}
        autoHideDuration={6000}
        onClose={() => {}}
        ContentProps={{
          'aria-describedby': 'message-id',
        }}
        message={<span id="message-id">{message}</span>}
        action={[
          actionTitle && action ?<Button key="menu" color="inherit" size="small" onClick={action}>
            {actionTitle}
          </Button> : null,
          <IconButton
            key="close"
            aria-label="Close"
            color="inherit"
            onClick={() => this.setState({ closed: true })}>
            <Close />
          </IconButton>
        ]}
      />
    )
  }
}
