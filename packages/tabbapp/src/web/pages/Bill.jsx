import React from 'react';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Divider from '@material-ui/core/Divider';
import AppBar from 'web/components/AppBar';
import BillItem from 'web/components/BillItem';
import GuestList from 'web/components/GuestList';
import ResponsiveContainer from 'web/components/ResponsiveContainer';
import Typography from 'web/components/Typography';
import CreditCard from 'icons/CreditCard';
import Slider from '@material-ui/lab/Slider';
import {
  fetchBillInit,
  setGratitude as setGratitudeAction
} from 'ducks/bill/actions';
import { fetchSeatsInit } from 'ducks/seat/actions';
import { checkSelecting } from 'ducks/bill/selectors';

import * as FN from 'lib/FN';

const styles = theme => ({

});

class Bill extends React.PureComponent {
  componentWillMount() {
    const {
      fetchBill,
      fetchSeats
    } = this.props;
    fetchBill();
    fetchSeats();
  }
  render() {
    const { classes, bill, seats = [], selecting, setGratitude, gratitude } = this.props;
    const iosInstalled = FN.isInstalled() && FN.getPlatform() === 'ios';
    const billItems = bill.items || [];
    let currency = 'KWD';
    let subtotalAmount = 0;
    if (bill.subtotal) {
      currency = bill.subtotal.currency;
      subtotalAmount = Number(bill.subtotal.amount);
    }
    const gratitudeAmount = subtotalAmount * (gratitude / 100);
    const totalAmount = subtotalAmount + gratitudeAmount;
    return (
      <div>
        {!iosInstalled && <AppBar position="static"/>}
        <ResponsiveContainer>
          <div style={{display: 'flex', alignItems: 'center', paddingTop: 16, marginBottom: 16}}>
            <Typography style={{flex: 1}} variant="subheading">
              My bill
            </Typography>
            <Typography variant="caption">
              {`${billItems.length > 0 ? billItems.length : 'no'} item${billItems.length !== 1 ? 's' : ''}`}
            </Typography>
          </div>
        </ResponsiveContainer>
        <GuestList seats={seats}/>
        <ResponsiveContainer>
          {billItems.map((item, i) =>
            <BillItem key={item.order_item.id} item={item} index={i} />
          )}
        </ResponsiveContainer>
        <Divider style={{marginTop: 16, marginBottom: 16}}/>
        <ResponsiveContainer>
          <div style={{display: 'flex'}}>
            <Typography style={{flex: 1}}>
              Sub total
            </Typography>
            <Typography>
              {FN.formatPrice({amount: subtotalAmount, currency})}
            </Typography>
          </div>
          <div style={{display: 'flex', marginTop: 8}}>
            <Typography style={{fontWeight: 700, marginRight: 8}}>
              {gratitude}%
            </Typography>
            <Typography style={{flex: 1}}>
              Gratitude
            </Typography>
            <Typography>
              {FN.formatPrice({amount: gratitudeAmount, currency})}
            </Typography>
          </div>
          <Slider
            style={{marginTop: 8, marginBottom: 8}}
            value={gratitude} min={0} max={50} step={1}
            onChange={(event, val) => setGratitude({ percentage: val })}
          />
          <div style={{display: 'flex'}}>
            <Typography style={{flex: 1}}>
              Total
            </Typography>
            <Typography>
              {FN.formatPrice({amount: totalAmount, currency})}
            </Typography>
          </div>
        </ResponsiveContainer>
        <div style={{
          display: 'flex',
          width: '100%',
          marginTop: 16,
          marginBottom: 16,
          justifyContent: 'center',
        }}>
          <Button  color="primary" variant="extendedFab" aria-label="Pay">
            <CreditCard style={{marginRight: 16}} className={classes.extendedIcon} />
            {selecting ? 'Split / transfer' : 'Pay my bill'}
          </Button>
        </div>
      </div>
    )
  }
}

Bill = connect(
  state => ({
    bill: state.bill.bill,
    seats: state.seat.seats,
    selecting: checkSelecting(state),
    gratitude: state.bill.gratitude
  }),
  {
    fetchBill: fetchBillInit,
    fetchSeats: fetchSeatsInit,
    setGratitude: setGratitudeAction
  }
)(Bill)

export default withStyles(styles)(Bill);
