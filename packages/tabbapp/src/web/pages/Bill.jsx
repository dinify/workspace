import React from 'react';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Divider from '@material-ui/core/Divider';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import AppBar from 'web/components/AppBar';
import BillItem from 'web/components/BillItem';
import GuestList from 'web/components/GuestList';
import ResponsiveContainer from 'web/components/ResponsiveContainer';
import Typography from 'web/components/Typography';
import CreditCard from 'icons/CreditCard';
import Wallet from 'icons/Wallet';
import MobileScreenShare from 'icons/MobileScreenShare';
import Slider from '@material-ui/lab/Slider';
import {
  fetchBillInit,
  setGratitude as setGratitudeAction
} from 'ducks/bill/actions';
import { StaggeredMotion, Motion, spring } from 'react-motion';
import { fetchSeatsInit } from 'ducks/seat/actions';
import { checkSelecting } from 'ducks/bill/selectors';

import * as FN from 'lib/FN';

const styles = theme => ({
  scroller: {
    overflowX: 'auto',
    overflowY: 'hidden',
    width: '100%',
    WebkitScrollSnapType: 'mandatory',
    scrollSnapType: 'x mandatory',
    WebkitScrollSnapPointsX: 'repeat(100%)',
    scrollSnapPointsX: 'repeat(100%)',
    WebkitOverflowScrolling: 'touch',
    whiteSpace: 'nowrap',
    '&::-webkit-scrollbar': {
      display: 'none'
    },
    '& > div': {
      WebkitOverflowScrolling: 'touch',
      scrollSnapAlign: 'start',
    }
  },
});

class Bill extends React.Component {
  state = {
    payMenuOpen: false
  }

  componentWillMount() {
    const {
      fetchBill,
      fetchSeats
    } = this.props;
    fetchBill();
    fetchSeats();
  }

  togglePayMenu = (value = null) => {
    this.setState({payMenuOpen: value !== null ? value : !this.state.payMenuOpen})
  }

  render() {
    const { classes, bill, seats = [], selecting, setGratitude, gratitude } = this.props;
    const { payMenuOpen } = this.state;
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
        <GuestList seats={seats} selecting={selecting}/>
        <div className={classes.scroller}>
          {seats.map(seat =>
            <div style={{
              display: 'inline-block',
              width: '100%'
            }} key={seat.id}>
              <ResponsiveContainer>
                {billItems.map((item, i) =>
                  <BillItem key={item.order_item.id} item={item} index={i} />
                )}
              </ResponsiveContainer>
            </div>
          )}
        </div>
        <Divider style={{marginTop: 16, marginBottom: 16}}/>
        <Motion
          defaultStyle={{x: 1}}
          style={{x: spring(payMenuOpen ? 0.12 : 1, { stiffness: 260, damping: 24 })}}>
          {style =>
            <div style={{pointerEvents: payMenuOpen ? 'none' : null, opacity: style.x, transform: 'translate3d(0,0,0)'}}>
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
            </div>
          }
        </Motion>
        <ClickAwayListener onClickAway={() => this.togglePayMenu(false)}>
          <div style={{width: '100%', display: 'flex', justifyContent: 'center', marginTop: 16, marginBottom: 16,}}>
            <StaggeredMotion
              defaultStyles={[{x: 0.1}, {x: 0.1}, {x: 0.1}]}
              styles={prevStyles => prevStyles.map((_, i) => {
                return i === 0
                  ? {x: spring(payMenuOpen ? 1 : 0.1, {stiffness: 240, damping: 14})}
                  : {x: spring(prevStyles[i - 1].x, {stiffness: 240, damping: 22})}
              })}>
              {styles =>
                <div style={{position: 'absolute'}}>
                  {styles.map((style, i) =>
                    <div key={i} style={{
                      position: 'absolute',
                      left: -20,
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      transform: `translate3d(${(i - 1) * style.x * 128}px, -${(i === 1 ? style.x * 72 : style.x * 24) + 16}px, 0) scale(${style.x}, ${style.x})`,
                      WebkitTransform: `translate3d(${(i - 1) * style.x * 128}px, -${(i === 1 ? style.x * 72 : style.x * 24) + 16}px, 0) scale(${style.x}, ${style.x})`
                    }}>
                      <Button color="default" variant="fab" aria-label="Pay" mini>
                        {i === 0 ? <Wallet /> : (i === 1 ? <CreditCard/> : <MobileScreenShare />)}
                      </Button>
                      <Typography style={{marginTop: 8}} variant="caption">
                        {i === 0 ? 'Cash' : (i === 1 ? 'Card' : 'Online')}
                      </Typography>
                    </div>
                  )}
                </div>
              }
            </StaggeredMotion>
            <Button onClick={() => this.togglePayMenu()} color="primary" variant="extendedFab" aria-label="Pay">
              <CreditCard style={{marginRight: 16}} className={classes.extendedIcon} />
              {selecting ? 'Split / transfer' : 'Pay my bill'}
            </Button>
          </div>
        </ClickAwayListener>
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
