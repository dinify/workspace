import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemText from '@material-ui/core/ListItemText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Dialog from '@material-ui/core/Dialog';

import CreditCard from 'icons/CreditCard';
import Public from 'icons/Public';
import Wallet from 'icons/Wallet';

const options = [
  {
    name: 'Cash',
    icon: <Wallet />,
    index: 0,
    type: 'CASH'
  },
  {
    name: 'Card',
    icon: <CreditCard />,
    index: 1,
    type: 'CARD'
  },
  {
    name: 'Online (coming soon)',
    icon: <Public />,
    index: 2,
    disabled: true,
    type: 'ONLINE'
  }
];
const styles = theme => ({
  avatar: {
    backgroundColor: theme.palette.primary.main,
  }
});

class PaymentOptionsDialog extends React.Component {
  handleClose = () => {
    this.props.onClose(null);
  };

  handleListItemClick = value => {
    this.props.onClose(value);
  };

  render() {
    const { classes, onClose, ...other } = this.props;

    return (
      <Dialog onClose={this.handleClose} aria-labelledby="payment-options-dialog" {...other}>
        <DialogTitle id="payment-options-dialog">Select payment option</DialogTitle>
        <div>
          <List>
            {options.map(option => (
              <ListItem button disabled={option.disabled} onClick={() => this.handleListItemClick(option)} key={option.index}>
                <ListItemAvatar>
                  <Avatar className={classes.avatar}>
                    {option.icon}
                  </Avatar>
                </ListItemAvatar>
                <ListItemText primary={option.name} />
              </ListItem>
            ))}
            {/* }<ListItem button onClick={() => this.handleListItemClick('addAccount')}>
              <ListItemAvatar>
                <Avatar>
                  <AddIcon />
                </Avatar>
              </ListItemAvatar>
              <ListItemText primary="add account" />
            </ListItem> */}
          </List>
        </div>
      </Dialog>
    );
  }
}

export default withStyles(styles)(PaymentOptionsDialog);
