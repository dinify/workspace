import React from 'react';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';
import AppBar from 'web/components/AppBar';
import Typography from 'tabb-front/dist/components/Typography';
import SimpleGuestList from 'web/components/SimpleGuestList';
import BillItem from 'web/components/BillItem';
import Event from '@material-ui/icons/EventRounded';
import Wallet from '@material-ui/icons/AccountBalanceWalletRounded';
import RestaurantMenu from '@material-ui/icons/RestaurantMenuRounded';
import Divider from '@material-ui/core/Divider';
import Grid from '@material-ui/core/Grid';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import * as FN from 'tabb-front/dist/lib/FN';
import { fetchReceiptInit } from 'ducks/bill/actions';
import moment from 'moment';

const styles = theme => ({
  summary: {
    border: `1px solid ${theme.palette.divider}`,
    borderRadius: 4,
    margin: 16,
    padding: 16
  },
});

class Receipt extends React.Component {

  componentWillMount() {
    const {
      fetchReceipt
    } = this.props;
    fetchReceipt();
  }
  render() {
    const {
      classes,
      status,
      lastBill
    } = this.props;
    const iosInstalled = FN.isInstalled() && FN.getPlatform() === 'ios';
    return (
      <div>
        {!iosInstalled && <AppBar position="static"/>}
        <Typography style={{paddingTop: 16, paddingLeft: 16, paddingRight: 16}} variant="overline">
          Receipt
        </Typography>
        <div className={classes.summary}>
          <Typography variant="subtitle1" style={{marginBottom: 16}}>
            Korea grill
          </Typography>
          <Grid container spacing={32} style={{marginBottom: 16}}>
            <Grid item xs={6} sm={4}>
              <ListItem style={{padding: 0}} dense>
                <ListItemIcon>
                  <Event />
                </ListItemIcon>
                <ListItemText style={{padding: 0}} primary={moment().format("MMM Do YYYY")} secondary="Checked in" />
              </ListItem>
            </Grid>
            <Grid item xs={6} sm={4}>
              <ListItem style={{padding: 0}} dense>
                <ListItemIcon>
                  <RestaurantMenu />
                </ListItemIcon>
                <ListItemText style={{padding: 0}} primary="Dine-in" secondary="Order type" />
              </ListItem>
            </Grid>
            <Grid item xs={6} sm={4}>
              <ListItem style={{padding: 0}} dense>
                <ListItemIcon>
                  <Wallet />
                </ListItemIcon>
                <ListItemText style={{padding: 0}} primary="Cash" secondary="Payment type" />
              </ListItem>
            </Grid>
            {/*
              <Grid item xs={6} sm={3}>
                <ListItem style={{padding: 0}} dense>
                  <ListItemIcon>
                    <Schedule />
                  </ListItemIcon>
                  <ListItemText style={{padding: 0}} primary="40 minutes" secondary="Arrival time" />
                </ListItem>
              </Grid>
            */}
          </Grid>
          {status && <SimpleGuestList seats={status.seats}/>}
          <Divider style={{marginBottom: 16, marginTop: 16}}/>
          {lastBill && lastBill.items && lastBill.items.map((item, i) =>
            <BillItem key={item.order_item.id} item={item} index={i} />
          )}
        </div>
      </div>
    );
  }
}


Receipt = connect(
  state => ({
    status: state.status,
    lastBill: state.bill.lastBill
  }),
  {
    fetchReceipt: fetchReceiptInit
  }
)(Receipt)

export default withStyles(styles)(Receipt);
