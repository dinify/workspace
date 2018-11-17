import React from 'react';
import R from 'ramda';
import {connect} from 'react-redux';
import {withStyles} from '@material-ui/core/styles';

import {
  setGratitude as setGratitudeAction,
  splitBillInit,
  transferBillInit,
  initTransactionInit,
} from 'ducks/bill/actions';
import { rmFromCartInit, orderInit, setOrderTypeAction } from 'ducks/cart/actions';
import {
  checkSelecting,
  selectedBillItems as selectedBillItemsSelector,
  selectedSeats as selectedSeatsSelector,
} from 'ducks/seat/selectors';
import {
  fetchSeatsInit,
  selectBillItem as selectBillItemAction,
  selectSeat as selectSeatAction,
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
import PageIndicator from 'web/components/PageIndicator';
import Cart from 'web/pages/Cart';

import RestaurantMenu from 'icons/RestaurantMenu';
import CreditCard from 'icons/CreditCard';
import Delete from 'icons/Delete';
import Done from 'icons/Done';
import QRCodeScan from 'icons/QRCodeScan';

import Typography from 'web/components/Typography';
import Slider from '@material-ui/lab/Slider';
import * as FN from 'tabb-front/dist/lib/FN';

import IconButton from '@material-ui/core/IconButton';
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
    splitMenuOpen: false,
    editingCart: false
  }

  componentWillMount() {
    const {fetchSeats} = this.props;
    fetchSeats();
  }

  componentDidUpdate(prevProps, prevState) {
    const { selecting, seats } = this.props;
    if (prevProps.selecting !== selecting) {
      this.setState({splitMenuOpen: selecting});
    }
    if (prevProps.seats !== seats &&
        prevProps.seats[0] !== undefined &&
        prevProps.seats[0] !== seats[0] &&
        prevProps.seats[0].paid !== seats[0].paid) {
      this.setState({awaitingPaymentConfirmation: !seats[0].paid});
    }
  }

  onCancelSplit = () => {
    this.props.clearSelectedBillItems();
    this.setState({splitMenuOpen: false});
  }

  onGuestClick = i => {
    if (!this.props.selecting) {
      this.setActiveGuest(i);
    }
    else {
      this.props.selectSeat({
        selected: !this.props.seats[i].selected,
        seatIndex: i
      })
    }
  }

  setActiveGuest = i => {
    if (this.state.payMenuOpen) this.setState({payMenuOpen: false});
    this.setState({activeGuest: i});
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
      checkedin,
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
      selectedSeats,
      splitBill, //transferBill,
      loggedUserId,
      initTransaction,
      splitLoading,
    } = this.props;
    let { seats = [] } = this.props;

    const { activeGuest, editingCart, awaitingPaymentConfirmation, payMenuOpen, splitMenuOpen } = this.state;
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
    seats = Object.values(seats);

    /* if (checkedInRestaurant) setOrderType({ orderType: 'DINE_IN' })
    else if (orderType === 'DINE_IN' && notCheckedIn) {
      setOrderType({ orderType: 'AHEAD' })
    } */

    let splitText = '';
    for (let i = 0; i < selectedSeats.length; i += 1) {
      const uid = selectedSeats[i].user_id;
      if (uid === loggedUserId) { continue; }
      splitText += users[uid].name;
      if (i === selectedSeats.length - 2) splitText += ' and ';
      else if (i !== selectedSeats.length - 1) splitText += ', ';
    }
    return (
      <div>
        {!iosInstalled && <AppBar position="static"/>}
        {checkedin && <div>
            {multiparty &&
              <div className={`${classes.defaultBackgroundFill} ${splitMenuOpen ? 'sticky' : ''}`} style={{
                top: 0,
                zIndex: 100
              }}>
                <GuestList
                  onGuestClick={this.onGuestClick}
                  active={activeGuest}
                  seats={seats}/>
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
                  const userIsMe = seat.user_id === loggedUserId;
                  let currency = 'KWD';
                  let subtotalAmount = 0;
                  if (seat.bill)  {
                    currency = seat.bill.subtotal.currency;
                    subtotalAmount = Number(seat.bill.subtotal.amount);
                  }

                  const gratitudeAmount = subtotalAmount * (gratitude / 100);
                  const totalAmount = subtotalAmount + gratitudeAmount;

                  return (
                    <div id={seat.id} key={seat.id} style={{
                        display: 'inline-block',
                        // border: '1px solid rgba(255,0,0,0.54)',
                        verticalAlign: 'top',
                        width: '100%',
                        minHeight: 'calc(100vh - 214px)'
                      }}>
                      <ResponsiveContainer>
                        <div style={{display: 'flex'}}>
                          <div style={{flex: 1, display: 'flex', marginTop: 16}}>
                            <Typography style={{flex: 1, marginRight: 16}} variant="overline">
                              Cart
                            </Typography>
                            <Typography variant="caption">
                              {editingCart && userIsMe ? 'editing' : `${seat.cart ? (seat.cart.count + (seat.cart.count !== 1 ? ' items' : ' item')) : 'no items'}`}
                            </Typography>

                          </div>
                          {userIsMe && seat.cart && <IconButton onClick={() => this.setState({editingCart: !editingCart})}>
                            {editingCart ? <Done /> : <Delete />}
                          </IconButton>}
                        </div>

                        {seat.cart && FN.MapToList(seat.cart.restaurants).map(restaurant =>
                          FN.MapToList(restaurant.items).map(item =>
                            <div key={item.id} style={{marginTop: 16}}>
                              <CartItem rmFromCart={rmFromCart} editing={userIsMe && editingCart} item={item} />
                            </div>
                          )
                        )}

                        {seat.cart &&
                          <div style={{marginBottom: userIsMe && seat.cart ? 16: 0}}>
                            <div style={{display: 'flex', alignItems: 'center', marginTop: 16}}>
                              <Typography style={{flex: 1}} variant="subtitle1">
                                Total
                              </Typography>

                              <Typography variant="subtitle1">
                                {FN.formatPrice(seat.cart.subtotal)}
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
                        <Divider style={{marginTop: userIsMe && seat.cart ? 0 : 16, marginBottom: 16}}/>

                        <div style={{display: 'flex', marginTop: 16}}>
                          <Typography style={{flex: 1, marginRight: 16}} variant="overline">
                            Bill
                          </Typography>
                          <Typography variant="caption">
                            {`${seat.bill ? (seat.bill.count + (seat.bill.count !== 1 ? ' items' : ' item')) : 'no items'}`}
                          </Typography>
                        </div>

                        {userIsMe && <Typography variant="caption" color="textSecondary" style={{opacity: selecting ? 0 : 1}}>
                          Select bill items to split with others
                        </Typography>}

                        {seat.bill && FN.MapToList(seat.bill.orders).map(order =>
                          FN.MapToList(order.items).map((item, i) =>
                            <div key={item.id} style={{
                                marginTop: 16
                              }}>
                              <BillItem onClick={() => {
                                const selectable = item.initiator === loggedUserId && !item.locked;
                                if (selectable) selectBillItem({
                                  selected: !(item.selected || false),
                                  path: ['seats', currentSeatIndex, 'bill', 'orders', order.id, 'items', item.id, 'selected']
                                });
                              }} seat={seat} item={item} index={i}/>
                            </div>
                          )
                        )}

                        {userIsMe && seat.bill && <div style={{
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
                                 value={gratitude} min={0} max={50} step={1} onChange={(event, val) => setGratitude({percentage: val})}/>
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
                        {!userIsMe && seat.bill && <div style={{
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

                        {userIsMe && seat.bill && <div style={{
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
                <Typography style={{
                  whiteSpace: 'nowrap',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                }} variant="subtitle2" color="inherit">
                  {
                    selectedSeats.length <= 1 ? 'Select users to split with' : (
                    selectedSeats.length <= 2 ? `Splitting with ${splitText}` : (
                      `Splitting between ${selectedSeats.length} people`
                    ))
                  }
                </Typography>
                <Typography style={{
                  opacity: 0.72,
                }} color="inherit" variant="caption">
                  {selectedBillItems.length + (selectedBillItems.length === 1 ? ' item' : ' items')} selected
                </Typography>
              </div>
              {!splitLoading && <Button style={{
                border: '1px solid rgba(255, 255, 255, 0.23)',
                color: selectedSeats.length <= 1 ? 'rgba(255, 255, 255, 0.26)' : 'inherit',
              }}
              disabled={selectedSeats.length <= 1}
              onClick={() => splitBill({
                orderItems: selectedBillItems.map((item) => ({ id: item.id })),
                withIds: selectedSeats.filter(seat => seat.user_id !== loggedUserId).map((seat) => seat.user_id)
              })}
              variant="outlined"
              color="inherit">
                Split
              </Button>}
              {splitLoading && <Typography color="inherit" style={{opacity: 0.54}} variant="caption">
                Loading...
              </Typography>}
            </ContextMenu>
          </div>
        }
        {!checkedin && <Cart appbar={false}/>}
        {/* <div style={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          width: '100vw',
          height: 'calc(100vh - 114px)'
        }}>
          <Cart appbar={false}/>
          <QRCodeScan style={{width: 40, height: 40, margin: 16}} color="disabled" />
          <Typography align="center" style={{maxWidth: 288}}>
            To get started using feature, scan the QR code in a restaurant near you to check in.
          </Typography>
        </div>} */}

      </div>
    );
  }
}

Eat = connect(state => ({
  seats: state.seat.seats,
  checkedin: state.seat.checkedin,
  splitLoading: state.seat.splitLoading,
  users: state.user.all,
  selecting: checkSelecting(state),
  selectedBillItems: selectedBillItemsSelector(state),
  selectedSeats: selectedSeatsSelector(state),
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
  selectSeat: selectSeatAction,
  clearSelectedBillItems: clearSelectedBillItemsAction,
  rmFromCart: rmFromCartInit,
  order: orderInit
})(Eat)

export default withStyles(styles)(Eat);
