import React from 'react';
import {connect} from 'react-redux';
import {withStyles} from '@material-ui/core/styles';

import {setGratitude as setGratitudeAction, splitBillInit, transferBillInit, initTransactionInit} from 'ducks/bill/actions';
import {checkSelecting} from 'ducks/bill/selectors';
import {fetchSeatsInit} from 'ducks/seat/actions';

import ResponsiveContainer from 'web/components/ResponsiveContainer';
import AppBar from 'web/components/AppBar';
import GuestList from 'web/components/GuestList';
import Typography from 'web/components/Typography';

import Divider from '@material-ui/core/Divider';

/* import Button from '@material-ui/core/Button';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import Grid from '@material-ui/core/Grid';
import BillItem from 'web/components/BillItem';
import AlignBottom from 'icons/AlignBottom';
import AlignTop from 'icons/AlignTop';
import CallSplit from 'icons/CallSplit';
import CreditCard from 'icons/CreditCard';
import Wallet from 'icons/Wallet';
import MobileScreenShare from 'icons/MobileScreenShare';
import Slider from '@material-ui/lab/Slider';
import scrollIntoView from 'scroll-into-view-if-needed';
import {StaggeredMotion, Motion, spring} from 'react-motion';
import {fetchSeatsInit} from 'ducks/seat/actions';
import {checkSelecting} from 'ducks/bill/selectors';
import PaymentOptionsDialog from 'web/components/PaymentOptionsDialog'; */
import * as FN from 'lib/FN';


const styles = theme => ({
  scroller: {
    overflowX: 'auto',
    overflowY: 'hidden',
    width: '100%',
    whiteSpace: 'nowrap',
    WebkitScrollSnapType: 'mandatory',
    scrollSnapType: 'x mandatory',
    WebkitScrollSnapPointsX: 'repeat(100%)',
    scrollSnapPointsX: 'repeat(100%)',
    WebkitOverflowScrolling: 'touch',
    '&::-webkit-scrollbar': {
      display: 'none'
    },
    '& > div': {
      WebkitOverflowScrolling: 'touch',
      scrollSnapAlign: 'start'
    }
  }
});

class Eat extends React.Component {

  state = {
    activeGuest: 0,
  }

  constructor() {
    super();
    this.enableScrollHandler = true;
    this.stateIsChanging = false;
    this.touching = false;
  }

  componentWillMount() {
    const {fetchSeats} = this.props;
    fetchSeats();
  }

  setActiveGuest = i => {
    if (this.touching) return;
    this.enableScrollHandler = false;
    this.setState({activeGuest: i})
  }

  onPointerStart = e => {
    this.touching = true;
    this.enableScrollHandler = true;
  }

  onPointerEnd = e => {
    this.touching = false;
  }

  handleScroll = e => {
    if (!this.enableScrollHandler || this.stateIsChanging) return;
    const ratio = (e.target.scrollLeft / e.target.children[0].scrollWidth);
    const count = this.props.seats
      ? this.props.seats.length
      : 0;
    if (count > 1) {
      const guestIndex = Math.floor(ratio + (1/2));
      if (this.state.activeGuest !== guestIndex) {
        this.stateIsChanging = true;
        this.setState({activeGuest: guestIndex}, () => {
          this.stateIsChanging = false;
        });
      }
    }
  };

  render() {
    const {
      classes,
      seats = [],
      selecting,
      setGratitude,
      gratitude,
      // splitBill, transferBill,
      loggedUserId,
      initTransaction
    } = this.props;

    const { activeGuest } = this.state;
    const iosInstalled = FN.isInstalled() && FN.getPlatform() === 'ios';
    for (let i = 0; i < seats.length; i+=1) {
      if (seats[i].user_id === loggedUserId) {
        const temp = seats[i];
        seats[i] = seats[0];
        seats[0] = temp;
        break;
      }
    }

    return (
      <div>
        {!iosInstalled && <AppBar position="static"/>}
        <GuestList onGuestClick={this.setActiveGuest} active={activeGuest} seats={seats} selecting/>
        <ResponsiveContainer>
          <Divider style={{
            marginBottom: 16
          }}/>
        </ResponsiveContainer>
        <div
          className={classes.scroller}
          onTouchStart={this.onPointerStart}
          onTouchEnd={this.onPointerEnd}
          onMouseEnter={this.onPointerStart}
          onMouseLeave={this.onPointerEnd}
          onScroll={this.handleScroll}>
          {
            seats.map(seat => {

              return (
                <div id={seat.id} style={{
                    display: 'inline-block',
                    border: '1px solid rgba(255,0,0,0.54)',
                    verticalAlign: 'top',
                    width: '100%',
                    minHeight: 'calc(100vh - 214px)'
                  }} key={seat.id}>
                  <ResponsiveContainer>
                    <Typography variant="overline">
                      Cart
                    </Typography>
                  </ResponsiveContainer>
                </div>
              );
            })
          }
        </div>
      </div>
    );
  }
}

Eat = connect(state => ({
  seats: state.seat.seats,
  selecting: checkSelecting(state),
  gratitude: state.bill.gratitude,
  loggedUserId: state.user.loggedUserId
}), {
  fetchSeats: fetchSeatsInit,
  setGratitude: setGratitudeAction,
  splitBill: splitBillInit,
  transferBill: transferBillInit,
  initTransaction: initTransactionInit
})(Eat)

export default withStyles(styles)(Eat);
