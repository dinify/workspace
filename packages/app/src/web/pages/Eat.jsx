import React from 'react';
import {connect} from 'react-redux';
import {withStyles} from '@material-ui/core/styles';
import { withTranslation } from 'react-i18next';
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

import ResponsiveContainer from '@dinify/common/dist/components/ResponsiveContainer';
import GuestList from 'web/components/GuestList';
import ScrollSnapView from 'web/components/ScrollSnapView';
import CartItem from 'web/components/CartItem';
import BillItem from 'web/components/BillItem';
import PaymentOptionsDialog from '@dinify/common/dist/components/dialogs/PaymentOptionsDialog';
import ContextMenu from 'web/components/ContextMenu';
import Cart from 'web/pages/Cart';

import RestaurantMenu from '@material-ui/icons/RestaurantMenuRounded';
import CreditCard from '@material-ui/icons/CreditCardRounded';
import Delete from '@material-ui/icons/DeleteRounded';
import Done from '@material-ui/icons/DoneRounded';

import Typography from '@dinify/common/dist/components/Typography';
import Slider from '@material-ui/lab/Slider';
import * as FN from '@dinify/common/dist/lib/FN';

import IconButton from '@material-ui/core/IconButton';
import Divider from '@material-ui/core/Divider';
import Button from '@material-ui/core/Button';
import Fab from '@material-ui/core/Fab';

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
      // eslint-disable-next-line react/no-did-update-set-state
      this.setState({splitMenuOpen: selecting});
    }
    if (prevProps.seats !== seats &&
        seats[0] !== undefined &&
        prevProps.seats[0] !== undefined &&
        prevProps.seats[0] !== seats[0] &&
        prevProps.seats[0].paid !== seats[0].paid) {
      // eslint-disable-next-line react/no-did-update-set-state
      this.setState({awaitingPaymentConfirmation: !seats[0].paid});
    }
  }

  onCancelSplit = () => {
    const { clearSelectedBillItems } = this.props;
    clearSelectedBillItems();
    this.setState({splitMenuOpen: false});
  }

  onGuestClick = i => {
    const { selecting, selectSeat, seats } = this.props;
    if (!selecting) {
      this.setActiveGuest(i);
    }
    else {
      selectSeat({
        selected: !seats[i].selected,
        seatIndex: i
      })
    }
  }

  setActiveGuest = i => {
    const { payMenuOpen } = this.state;
    if (payMenuOpen) this.setState({payMenuOpen: false});
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
      rmFromCart,
      checkedInRestaurant,
      order,
      selectBillItem,
      selectedBillItems,
      selectedSeats,
      splitBill,
      loggedUserId,
      splitLoading,
      t,
    } = this.props;
    let { seats = [] } = this.props;

    const { activeGuest, editingCart, awaitingPaymentConfirmation, payMenuOpen, splitMenuOpen } = this.state;
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

    const splitingWithNames = [];
    for (let i = 0; i < selectedSeats.length; i += 1) {
      const uid = selectedSeats[i].user_id;
      if (uid === loggedUserId) { continue; }
      splitingWithNames.push(users[uid].name);
    }
    const localizedList = (key, arr) => {
      if (!arr || arr.length === 0) return '';
      else if (arr.length === 1) return arr[0];
      else {
        const obj = {};
        arr.forEach((item, i) => {
          obj[`${i}`] = item;
        });
        if (arr.length === 2) return t(key, {
          context: '2',
          first: arr[0],
          last: arr[1]
        });
        else if (arr.length === 3) {
          return t(key, {
            context: 'start',
            first: arr[0],
            end: t(key, {
              context: 'end',
              start: arr[1],
              last: arr[2],
            })
          });
        }
        else {
          let pointer = arr.length - 1;
          let result = t(key, {
            context: 'end',
            last: arr[pointer],
            start: arr[pointer - 1]
          });
          pointer -= 2;
          while (pointer > 0) {
            result = t(key, {
              context: 'middle',
              end: result,
              start: arr[pointer]
            });
            pointer -= 1;
          }
          result = t(key, {
            context: 'start',
            last: result,
            first: arr[pointer] // pointer should be 0
          });
          return result;
        }
      }
    };
    return (
      <div>
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

                  const cartCount = seat.cart ? seat.cart.count : 0;
                  const billCount = seat.bill ? seat.bill.count : 0;

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
                              {t('cart.title')}
                            </Typography>
                            <Typography variant="caption">
                              {editingCart && userIsMe ? t('editing') : t('cart.itemCount', { count: cartCount, context: cartCount === 0 ? 'none' : undefined })}
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
                                {t('total')}
                              </Typography>

                              <Typography variant="subtitle1">
                                {FN.formatPrice(seat.cart.subtotal)}
                              </Typography>
                            </div>

                            {userIsMe && <Fab
                              disabled={notCheckedIn || selecting}
                              style={{marginTop: 16, width: '100%'}}
                              variant="extended"
                              color="primary"
                              onClick={() => order()}>
                              <RestaurantMenu style={{marginRight: 16}} />
                              {t('order')}
                            </Fab>}
                          </div>
                        }
                        <Divider style={{marginTop: userIsMe && seat.cart ? 0 : 16, marginBottom: 16}}/>

                        <div style={{display: 'flex', marginTop: 16}}>
                          <Typography style={{flex: 1, marginRight: 16}} variant="overline">
                            {t('bill.title')}
                          </Typography>
                          <Typography variant="caption">
                            {t('cart.itemCount', { count: billCount, context: billCount === 0 ? 'none' : undefined })}
                          </Typography>
                        </div>

                        {userIsMe && <Typography variant="caption" color="textSecondary" style={{opacity: selecting ? 0 : 1}}>
                          {t('bill.selecting')}
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
                                  {t('subtotal')}
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
                                  {t('gratuity')}
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
                                  {t('total')}
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
                            {t('subtotal')}
                          </Typography>
                          <Typography>
                            {FN.formatPrice({amount: subtotalAmount, currency})}
                          </Typography>
                        </div>}

                        {userIsMe && seat.bill && <div style={{
                                marginTop: 16,
                                marginBottom: 16
                              }}>
                              <Fab fullWidth disabled={awaitingPaymentConfirmation || selecting} onClick={() => this.openPayMenu()} color="primary" variant="extended" aria-label={t('pay')}>
                                <CreditCard style={{
                                  marginRight: 16
                                }}/>
                                {t('pay')}
                              </Fab>
                              {awaitingPaymentConfirmation &&
                                <Typography style={{marginTop: 16, width: '100%', textAlign: 'center'}} variant="caption">
                                  {t('paymentPending')}
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
                    selectedSeats.length <= 3 ? t('bill.splittingWith', {
                      context: selectedSeats.length === 0 ? 'zero' : undefined,
                      list: localizedList('list.and', splitingWithNames)
                    }) : t('bill.splittingCount', { count: selectedSeats.length })
                  }
                </Typography>
                <Typography style={{
                  opacity: 0.72,
                }} color="inherit" variant="caption">
                  {t('bill.itemCountSelected', {
                    context: selectedBillItems.length === 0 ? 'none' : undefined,
                    count: selectedBillItems.length,
                  })}
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
                {t('split')}
              </Button>}
              {splitLoading && <Typography color="inherit" style={{opacity: 0.54}} variant="caption">
                {t('loadingEllipsis')}
              </Typography>}
            </ContextMenu>
          </div>
        }
        {!checkedin && <Cart />}
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
  loggedUserId: state.firebase.auth.uid,
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

export default withTranslation()(withStyles(styles)(Eat));
