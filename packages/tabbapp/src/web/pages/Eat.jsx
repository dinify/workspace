import React from 'react';
import {connect} from 'react-redux';
import {withStyles} from '@material-ui/core/styles';

import {
  setGratitude as setGratitudeAction,
  splitBillInit,
  transferBillInit,
  initTransactionInit,
} from 'ducks/bill/actions';
import { rmFromCartInit, orderInit, setOrderTypeAction } from 'ducks/cart/actions';
import { checkSelecting, selectedBillItems as selectedBillItemsSelector } from 'ducks/seat/selectors';
import {
  fetchSeatsInit,
  selectBillItem as selectBillItemAction,
  clearSelectedBillItems as clearSelectedBillItemsAction
} from 'ducks/seat/actions';

import ResponsiveContainer from 'web/components/ResponsiveContainer';
import AppBar from 'web/components/AppBar';
import GuestList from 'web/components/GuestList';
import ScrollSnapView from 'web/components/ScrollSnapView';
import CartItem from 'web/components/CartItem';
import BillItem from 'web/components/BillItem';
import PaymentOptionsDialog from 'web/components/PaymentOptionsDialog';
import ContextMenu from 'web/components/ContextMenu';

import RestaurantMenu from 'icons/RestaurantMenu';
import CreditCard from 'icons/CreditCard';

import Typography from '@material-ui/core/Typography';
import Slider from '@material-ui/lab/Slider';
import * as FN from 'tabb-front/dist/lib/FN';

import Divider from '@material-ui/core/Divider';
import Button from '@material-ui/core/Button';

const styles = theme => ({
  container: {
    width: '100%'
  },
  defaultBackgroundFill: {
    backgroundColor: theme.palette.background.default
  }
});

class Eat extends React.Component {

  state = {
    activeGuest: 0,
    payMenuOpen: false,
    awaitingPaymentConfirmation: false,
    splitMenuOpen: false
  }

  componentWillMount() {
    const {fetchSeats} = this.props;
    fetchSeats();
  }

  componentDidUpdate(prevProps, prevState) {
    console.log(prevProps.selecting, this.props.selecting);
    if (prevProps.selecting !== this.props.selecting) {
      this.setState({splitMenuOpen: this.props.selecting});
    }
  }

  onCancelSplit = () => {
    this.props.clearSelectedBillItems();
    this.setState({splitMenuOpen: false});
  }

  setActiveGuest = i => {
    if (this.state.payMenuOpen) this.setState({payMenuOpen: false});
    this.setState({activeGuest: i})
  }

  openPayMenu = () => {
    this.setState({payMenuOpen: true});
  }

  handleClose = value => {
    this.setState({payMenuOpen: false});
    if (value) {
      const {gratitude, initTransaction} = this.props;
      this.setState({awaitingPaymentConfirmation: true});
      initTransaction({gratuity: gratitude, type: value.type});
    }
  }

  render() {
    const {
      classes,
      seats = [],
      users,
      selecting,
      setGratitude,
      gratitude,
      subtotal,
      rmFromCart,
      checkedInRestaurant,
      orderType,
      setOrderType,
      cartItems,
      order,
      selectBillItem,
      selectedBillItems,
      // splitBill, transferBill,
      loggedUserId,
      initTransaction,
    } = this.props;

    const { activeGuest, awaitingPaymentConfirmation, payMenuOpen, splitMenuOpen } = this.state;
    const iosInstalled = FN.isInstalled() && FN.getPlatform() === 'ios';
    const multiparty = seats.length > 1;
    for (let i = 0; i < seats.length; i+=1) {
      if (seats[i].user_id === loggedUserId) {
        const temp = seats[i];
        seats[i] = seats[0];
        seats[0] = temp;
        break;
      }
    }

    const notCheckedIn = !checkedInRestaurant;

    /* if (checkedInRestaurant) setOrderType({ orderType: 'DINE_IN' })
    else if (orderType === 'DINE_IN' && notCheckedIn) {
      setOrderType({ orderType: 'AHEAD' })
    } */

    const meSelected = seats[activeGuest] ? seats[activeGuest].user_id === loggedUserId : false;

    return (
      <div>
        {!iosInstalled && <AppBar position="static"/>}
        {multiparty &&
          <div className={classes.defaultBackgroundFill} style={{
            top: 0,
            zIndex: 100,
            position: splitMenuOpen ? 'sticky' : 'static',
          }}>
            <GuestList selecting={selecting} onGuestClick={this.setActiveGuest} active={activeGuest} seats={seats}/>
            <ResponsiveContainer>
              <Divider/>
            </ResponsiveContainer>
          </div>
        }
        <ScrollSnapView
          selected={activeGuest}
          onChange={this.setActiveGuest}>
          {
            seats.map((seat, currentSeatIndex) => {
              const user = users[seat.user_id];
              const userIsMe = seat.user_id === loggedUserId;


              // BLOEAAHHHH this is pute vomit here
              let seatList = [];
              if (userIsMe) seatList = FN.MapToList(cartItems);
              else if (seat.cart) {
                Object.keys(seat.cart).forEach(key => {
                  if (key !== 'subtotal') {
                    FN.MapToList(seat.cart[key]).forEach(item => {
                      if (item.id !== 'subtotal') seatList.push(item);
                    });
                  }
                })
              }

              let billList = [];
              if (seat.bill) billList = seat.bill.items;
              let currency = 'KWD';
              let subtotalAmount = 0;
              if (seat && seat.bill && seat.bill.subtotal) {
                currency = seat.bill.subtotal.currency;
                subtotalAmount = Number(seat.bill.subtotal.amount);
              }

              const gratitudeAmount = subtotalAmount * (gratitude / 100);
              const totalAmount = subtotalAmount + gratitudeAmount;
              const activeBillItemCount = seat && seat.bill
                ? seat.bill.items.length
                : 0;


              return (
                <div id={seat.id} key={seat.id} style={{
                    display: 'inline-block',
                    // border: '1px solid rgba(255,0,0,0.54)',
                    verticalAlign: 'top',
                    width: '100%',
                    minHeight: 'calc(100vh - 214px)'
                  }}>
                  <ResponsiveContainer>
                    <div style={{display: 'flex', marginTop: 16}}>
                      <Typography style={{flex: 1, marginRight: 16, lineHeight: 'unset'}} variant="overline">
                        Cart
                      </Typography>
                      <Typography variant="caption">
                        {`${seatList.length > 0 ? seatList.length : 'no'} item${seatList.length !== 1 ? 's' : ''}`}
                      </Typography>
                    </div>

                    {seatList.map(item =>
                      <div key={item.id} style={{marginTop: 16}}>
                        <CartItem rmFromCart={rmFromCart} editing={false} item={item} />
                      </div>
                    )}

                    {seatList.length > 0 &&
                      <div>
                        <div style={{display: 'flex', alignItems: 'center', marginTop: 16}}>
                          <Typography style={{flex: 1}} variant="subtitle1">
                            Total
                          </Typography>

                          <Typography variant="subtitle1">
                            {FN.formatPrice({
                              amount: parseFloat(userIsMe ? subtotal.amount : seat.cart.subtotal.amount),
                              currency: userIsMe ? subtotal.currency : seat.cart.subtotal.currency
                            })}
                          </Typography>
                        </div>

                        {userIsMe && <Button
                          disabled={notCheckedIn || selecting}
                          style={{marginTop: 16}}
                          variant="extendedFab"
                          color="primary" fullWidth
                          onClick={() => order()}>
                          <RestaurantMenu style={{marginRight: 16}} />
                          Order
                        </Button>}
                      </div>
                    }
                    <Divider style={{marginTop: 16, marginBottom: 16}}/>

                    <div style={{display: 'flex', marginTop: 16}}>
                      <Typography style={{flex: 1, marginRight: 16, lineHeight: 'unset'}} variant="overline">
                        Bill
                      </Typography>
                      <Typography variant="caption">
                        {`${billList.length > 0 ? billList.length : 'no'} item${billList.length !== 1 ? 's' : ''}`}
                      </Typography>
                    </div>

                    {billList.map((item, i) =>
                      <div key={item.order_item.id} style={{
                          marginTop: 16
                        }}>
                        <BillItem onClick={() => {
                          selectBillItem({
                            selected: !(item.selected || false),
                            seatIndex: currentSeatIndex,
                            billItemIndex: i
                          });
                        }} item={item} index={i}/>
                      </div>
                    )}

                    {userIsMe && activeBillItemCount > 0 && <div style={{
                            transform: 'translate3d(0,0,0)'
                          }}>
                          <div style={{
                              display: 'flex',
                              marginTop: 16
                            }}>
                            <Typography style={{
                                flex: 1,
                              }}>
                              Subtotal
                            </Typography>
                            <Typography>
                              {FN.formatPrice({amount: subtotalAmount, currency})}
                            </Typography>
                          </div>
                          <div style={{
                              display: 'flex',
                              marginTop: 8,
                              marginBottom: 16,
                            }}>
                            <Typography style={{
                                fontWeight: 700,
                                marginRight: 8
                              }}>
                              {gratitude}%
                            </Typography>
                            <Typography style={{
                                flex: 1
                              }}>
                              Gratuity
                            </Typography>
                            <Typography>
                              {FN.formatPrice({amount: gratitudeAmount, currency})}
                            </Typography>
                          </div>
                          <Slider disabled={awaitingPaymentConfirmation}
                             value={gratitude} min={0} max={50} onChange={(event, val) => setGratitude({percentage: val})}/>
                          <div style={{
                              marginTop: 32,
                              display: 'flex'
                            }}>
                            <Typography variant="subtitle1" style={{
                                flex: 1
                              }}>
                              Total
                            </Typography>
                            <Typography variant="subtitle1">
                              {FN.formatPrice({amount: totalAmount, currency})}
                            </Typography>
                          </div>
                        </div>
                    }
                    {!userIsMe && activeBillItemCount > 0 && <div style={{
                        display: 'flex',
                        marginTop: 16
                      }}>
                      <Typography style={{
                          flex: 1
                        }}>
                        Subtotal
                      </Typography>
                      <Typography>
                        {FN.formatPrice({amount: subtotalAmount, currency})}
                      </Typography>
                    </div>}

                    {userIsMe && activeBillItemCount > 0 && <div style={{
                            marginTop: 16,
                            marginBottom: 16
                          }}>
                          <Button fullWidth disabled={awaitingPaymentConfirmation || selecting} onClick={() => this.openPayMenu()} color="primary" variant="extendedFab" aria-label="Pay">
                            <CreditCard style={{
                                    marginRight: 16
                                  }}/> Pay
                          </Button>
                          {awaitingPaymentConfirmation &&
                            <Typography style={{marginTop: 16, width: '100%', textAlign: 'center'}} variant="caption">
                              Awaiting payment confirmation...
                            </Typography>
                          }
                        </div>
                    }
                  </ResponsiveContainer>
                </div>
              );
            })
          }
        </ScrollSnapView>

        <PaymentOptionsDialog open={payMenuOpen} onClose={this.handleClose}/>

        <ContextMenu open={splitMenuOpen} onClose={this.onCancelSplit}>
          <div style={{flex: 1}}>
            <Typography color="inherit">
              {selectedBillItems.length} items selected
            </Typography>
            <Typography style={{opacity: 0.38}} color="inherit" variant="caption">
              Splitting with nobody
            </Typography>
          </div>
          <Button color="inherit">
            Split
          </Button>
        </ContextMenu>
      </div>
    );
  }
}

Eat = connect(state => ({
  seats: state.seat.seats,
  users: state.user.all,
  selecting: checkSelecting(state),
  selectedBillItems: selectedBillItemsSelector(state),
  gratitude: state.bill.gratitude,
  loggedUserId: state.user.loggedUserId,
  cartItems: state.cart.items,
  subtotal: state.cart.subtotal,
  orderType: state.cart.orderType,
  checkedInRestaurant: state.restaurant.checkedInRestaurant
}), {
  fetchSeats: fetchSeatsInit,
  setGratitude: setGratitudeAction,
  splitBill: splitBillInit,
  transferBill: transferBillInit,
  initTransaction: initTransactionInit,
  setOrderType: setOrderTypeAction,
  selectBillItem: selectBillItemAction,
  clearSelectedBillItems: clearSelectedBillItemsAction,
  rmFromCart: rmFromCartInit,
  order: orderInit
})(Eat)

export default withStyles(styles)(Eat);
