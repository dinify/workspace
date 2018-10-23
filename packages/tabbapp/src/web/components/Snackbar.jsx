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
      open: false
    };
  }

  componentDidUpdate(prevProps, prevState) {
    console.log(prevProps, prevState);
    if (prevProps.open !== this.props.open) {
      console.log(this.props.open);
      this.setState({open: this.props.open});
    }
  }

  render() {
    const {
      message,
      action,
      actionTitle,
    } = this.props;
    const { open } = this.state;
    return (
      <SnackbarMUI
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
        open={open}
        autoHideDuration={6000}
        onClose={() => {this.setState({ open: false })}}
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
            onClick={() => {this.setState({ open: false })}}>
            <Close />
          </IconButton>
        ]}
      />
    )
  }
}
