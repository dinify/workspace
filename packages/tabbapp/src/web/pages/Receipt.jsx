import React from 'react';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';
import AppBar from 'web/components/AppBar';
import Typography from 'web/components/Typography';
import SimpleGuestList from 'web/components/SimpleGuestList';
import BillItem from 'web/components/BillItem';
import Event from 'icons/Event';
import Wallet from 'icons/Wallet';
import Schedule from 'icons/Schedule';
import RestaurantMenu from 'icons/RestaurantMenu';
import Divider from '@material-ui/core/Divider';
import Grid from '@material-ui/core/Grid';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import * as FN from 'lib/FN';

const styles = theme => ({
  summary: {
    border: `1px solid ${theme.palette.divider}`,
    borderRadius: 4,
    margin: 16,
    padding: 16
  },
});

let Receipt = ({
  classes,
  status,
}) => {
  const iosInstalled = FN.isInstalled() && FN.getPlatform() === 'ios';
  return (
    <div>
      {!iosInstalled && <AppBar position="static"/>}

      <Typography style={{paddingTop: 16, paddingLeft: 16, paddingRight: 16}} variant="overline">
        Receipt
      </Typography>
      <div className={classes.summary}>
        <Typography variant="subheading" style={{marginBottom: 16}}>
          Korea grill
        </Typography>
        <Grid container spacing={32} style={{marginBottom: 16}}>
          <Grid item xs={6} sm={3}>
            <ListItem style={{padding: 0}} dense>
              <ListItemIcon>
                <Event />
              </ListItemIcon>
              <ListItemText style={{padding: 0}} primary="Aug 22, 2018" secondary="Checked in" />
            </ListItem>
          </Grid>
          <Grid item xs={6} sm={3}>
            <ListItem style={{padding: 0}} dense>
              <ListItemIcon>
                <RestaurantMenu />
              </ListItemIcon>
              <ListItemText style={{padding: 0}} primary="Order ahead" secondary="Order type" />
            </ListItem>
          </Grid>
          <Grid item xs={6} sm={3}>
            <ListItem style={{padding: 0}} dense>
              <ListItemIcon>
                <Wallet />
              </ListItemIcon>
              <ListItemText style={{padding: 0}} primary="Online" secondary="Payment type" />
            </ListItem>
          </Grid>
          <Grid item xs={6} sm={3}>
            <ListItem style={{padding: 0}} dense>
              <ListItemIcon>
                <Schedule />
              </ListItemIcon>
              <ListItemText style={{padding: 0}} primary="40 minutes" secondary="Arrival time" />
            </ListItem>
          </Grid>
        </Grid>
        {status && <SimpleGuestList seats={status.seats}/>}
        <Divider style={{marginBottom: 16, marginTop: 16}}/>
        {status && status.bill && status.bill.items.map((item, i) =>
          <BillItem key={item.order_item.id} item={item} index={i} />
        )}
      </div>
    </div>
  );
};

Receipt = connect(
  state => ({
    status: state.status
  }),
  {}
)(Receipt)

export default withStyles(styles)(Receipt);
