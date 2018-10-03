import React from 'react';
import {connect} from 'react-redux';
import {withStyles} from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Divider from '@material-ui/core/Divider';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import Grid from '@material-ui/core/Grid';
import AppBar from 'web/components/AppBar';
import BillItem from 'web/components/BillItem';
import GuestList from 'web/components/GuestList';
import ResponsiveContainer from 'web/components/ResponsiveContainer';
import Typography from 'web/components/Typography';
import AlignBottom from 'icons/AlignBottom';
import AlignTop from 'icons/AlignTop';
import CallSplit from 'icons/CallSplit';
import CreditCard from 'icons/CreditCard';
import Wallet from 'icons/Wallet';
import MobileScreenShare from 'icons/MobileScreenShare';
import Slider from '@material-ui/lab/Slider';
import {fetchBillInit, setGratitude as setGratitudeAction, splitBillInit, transferBillInit, initTransactionInit} from 'ducks/bill/actions';
import scrollIntoView from 'scroll-into-view-if-needed';
import {StaggeredMotion, Motion, spring} from 'react-motion';
import {fetchSeatsInit} from 'ducks/seat/actions';
import {checkSelecting} from 'ducks/bill/selectors';
import PaymentOptionsDialog from 'web/components/PaymentOptionsDialog';

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

class Bill extends React.Component {
  state = {
    payMenuOpen: false,
    activeGuest: 0,
    payButtonClicked: false
  }

  componentWillMount() {
    const {fetchSeats} = this.props;
    fetchSeats();
  }

  componentWillUpdate(nextProps, nextState) {
    if (nextProps.seats !== this.props.seats) {
      let uid = this.props.loggedUserId;
      this.props.seats.forEach(seat => {
        nextProps.seats.forEach(seatNext => {
          if (seat.user_id === uid && seatNext.user_id === uid) {
            const l1 = seat.bill ? seat.bill.items.length : 0;
            const l2 = seatNext.bill ? seatNext.bill.items.length : 0;
            if (l1 !== l2 || l2 === 0)
              this.setState({payButtonClicked: false})
          }
        })
      })
    }
  }

  setActiveGuest = (i) => {
    this.setState({activeGuest: i})
    const node = document.getElementById(this.props.seats[i].id);
    scrollIntoView(node, {
      behavior: 'smooth',
      scrollMode: 'always',
      inline: 'center'
    });
  }

  handleScroll = e => {
    const ratio = e.target.scrollLeft / e.target.scrollWidth;
    const count = this.props.seats
      ? this.props.seats.length
      : 0;
    if (count > 1) {
      const relWidth = 1 / count;
      const proximity = relWidth / 20;
      const last = count - 1;
      if (ratio >= 0 && ratio < 2 * proximity) {
        if (this.state.activeGuest !== 0)
          this.setState({activeGuest: 0});
        }
      else if (ratio > last * relWidth - proximity * 2 && ratio <= last * relWidth) {
        if (this.state.activeGuest !== last)
          this.setState({activeGuest: last});
        }
      else {
        for (let i = 1; i < last; i += 1) {
          if (ratio > i * relWidth - proximity && ratio < i * relWidth + proximity) {
            if (this.state.activeGuest !== i)
              this.setState({activeGuest: i});
            }
          }
      }
    }
  };

  togglePayMenu = (value = null) => {
    this.setState({
      payMenuOpen: value !== null
        ? value
        : !this.state.payMenuOpen
    })
  }

  handleClose = value => {
    this.setState({payMenuOpen: false});
    if (value) {
      const {gratitude, initTransaction} = this.props;
      this.setState({payButtonClicked: true});
      initTransaction({gratuity: gratitude, type: value.type});
    }
  }

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
    const {payMenuOpen, activeGuest, payButtonClicked} = this.state;
    const iosInstalled = FN.isInstalled() && FN.getPlatform() === 'ios';
    const activeBillItemCount = seats && seats[activeGuest] && seats[activeGuest].bill
      ? seats[activeGuest].bill.items.length
      : 0;

    return (<div>
      {!iosInstalled && <AppBar position="static"/>}
      <ResponsiveContainer>
        <div style={{
            display: 'flex',
            alignItems: 'center',
            paddingTop: 16,
            marginBottom: 16
          }}>
          <Typography style={{
              flex: 1
            }} variant="subheading">
            {
              activeGuest === 0
                ? 'My bill'
                : 'Other bill'
            }
          </Typography>
          <Typography variant="caption">
            {
              `${activeBillItemCount > 0
                ? activeBillItemCount
                : 'no'} item${activeBillItemCount !== 1
                  ? 's'
                  : ''}`
            }
          </Typography>
        </div>
      </ResponsiveContainer>
      <GuestList onGuestClick={this.setActiveGuest} active={activeGuest} seats={seats} selecting={selecting}/> {/* <Motion
          defaultStyle={{x: 0}}
          style={{x: spring(activeGuest, { stiffness: 260, damping: 32 })}}>
          {style =>
            <ScrollLink scrollLeft={style.x * document.body.clientWidth} className={classes.scroller}>

            </ScrollLink>
          }
        </Motion> */
      }
      <Divider style={{
          marginTop: 16,
          marginBottom: 16
        }}/>
      <div className={classes.scroller} onScroll={this.handleScroll}>
        {
          seats.map(seat => {
            let currency = 'KWD';
            let subtotalAmount = 0;
            if (seat && seat.bill && seat.bill.subtotal) {
              currency = seat.bill.subtotal.currency;
              subtotalAmount = Number(seat.bill.subtotal.amount);
            }

            // TODO compare seats[activeGuest].user_id with currently logged user id
            let meSelected = seats === null || seats.length === 0;
            meSelected = meSelected || (seat && seat.user_id === loggedUserId);

            const gratitudeAmount = subtotalAmount * (gratitude / 100);
            const totalAmount = subtotalAmount + gratitudeAmount;
            const activeBillItemCount = seat && seat.bill
              ? seat.bill.items.length
              : 0;

            return <div id={seat.id} style={{
                display: 'inline-block',
                verticalAlign: 'top',
                width: '100%'
              }} key={seat.id}>
              <ResponsiveContainer>
                {
                  seat.bill && seat.bill.items.map((item, i) => <div key={item.order_item.id} style={{
                      marginBottom: 8
                    }}>
                    <BillItem item={item} index={i}/>
                  </div>)
                }
                {
                  !seat.bill && <Typography style={{
                        paddingTop: 32,
                        width: '100%',
                        textAlign: 'center'
                      }} variant="caption">
                      This user does not have an outstanding bill.
                    </Typography>
                }

                {
                  meSelected && activeBillItemCount > 0 && <div style={{
                        transform: 'translate3d(0,0,0)'
                      }}>
                      <div style={{
                          display: 'flex'
                        }}>
                        <Typography style={{
                            flex: 1
                          }}>
                          Sub total
                        </Typography>
                        <Typography>
                          {FN.formatPrice({amount: subtotalAmount, currency})}
                        </Typography>
                      </div>
                      <div style={{
                          display: 'flex',
                          marginTop: 8
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
                      <Slider disabled={payButtonClicked} style={{
                          marginTop: 8,
                          marginBottom: 8
                        }} value={gratitude} min={0} max={50} step={1} onChange={(event, val) => setGratitude({percentage: val})}/>
                      <div style={{
                          display: 'flex'
                        }}>
                        <Typography style={{
                            flex: 1
                          }}>
                          Total
                        </Typography>
                        <Typography>
                          {FN.formatPrice({amount: totalAmount, currency})}
                        </Typography>
                      </div>
                    </div>
                }
                {
                  meSelected && <div style={{
                        marginTop: 16,
                        marginBottom: 16
                      }}>
                      <Button fullWidth disabled={!activeBillItemCount || payButtonClicked} onClick={selecting
                          ? () => {}
                          : () => this.togglePayMenu()} color="primary" variant="extendedFab" aria-label="Pay">
                        {
                          !selecting && <CreditCard style={{
                                marginRight: 16
                              }}/>
                        }
                        {
                          selecting && <CallSplit style={{
                                marginRight: 16
                              }}/>
                        }
                        {
                          selecting
                            ? 'Split / transfer'
                            : 'Pay'
                        }
                      </Button>
                      {payButtonClicked &&
                        <Typography style={{marginTop: 16, width: '100%', textAlign: 'center'}} variant="caption">
                          Awaiting payment confirmation...
                        </Typography>
                      }
                    </div>
                }
                {
                  meSelected && false && <ClickAwayListener onClickAway={() => this.togglePayMenu(false)}>
                      <div style={{
                          width: '100%',
                          display: 'flex',
                          justifyContent: 'center',
                          marginTop: 16,
                          marginBottom: 16
                        }}>
                        <StaggeredMotion defaultStyles={[
                            {
                              x: 0.1
                            }, {
                              x: 0.1
                            }, {
                              x: 0.1
                            }
                          ]} styles={prevStyles => prevStyles.map((_, i) => {
                            return i === 0
                              ? {
                                x: spring(
                                  payMenuOpen
                                  ? 1
                                  : 0.1, {
                                  stiffness: 240,
                                  damping: 14
                                })
                              }
                              : {
                                x: spring(prevStyles[i - 1].x, {
                                  stiffness: 240,
                                  damping: 22
                                })
                              }
                          })}>
                          {
                            styles => <div style={{
                                  position: 'absolute'
                                }}>
                                {
                                  styles.map((style, i) => <div key={i} style={{
                                      position: 'absolute',
                                      left: -20,
                                      display: 'flex',
                                      flexDirection: 'column',
                                      alignItems: 'center',
                                      transform: `translate3d(${ (i - 1) * style.x * 128}px, -${ (
                                        i === 1
                                        ? style.x * 72
                                        : style.x * 24) + 16}px, 0) scale(${style.x}, ${style.x})`,
                                      WebkitTransform: `translate3d(${ (i - 1) * style.x * 128}px, -${ (
                                        i === 1
                                        ? style.x * 72
                                        : style.x * 24) + 16}px, 0) scale(${style.x}, ${style.x})`
                                    }}>
                                    <Button color="default" variant="fab" aria-label="Pay" disabled={i === 2} mini="mini" onClick={() => initTransaction({gratuity: gratitude, type: 'CASH'})}>
                                      {
                                        i === 0
                                          ? <Wallet/>
                                          : (
                                            i === 1
                                            ? <CreditCard/>
                                            : <MobileScreenShare/>)
                                      }
                                    </Button>
                                    <Typography style={{
                                        marginTop: 8
                                      }} variant="caption">
                                      {
                                        i === 0
                                          ? 'Cash'
                                          : (
                                            i === 1
                                            ? 'Card'
                                            : 'Online')
                                      }
                                    </Typography>
                                  </div>)
                                }
                              </div>
                          }
                        </StaggeredMotion>
                        {/*
                        splitBill({ itemId: , userIds: })
                        transferBill({ itemId: , userId: })
                      */
                        }
                        <Button disabled={!activeBillItemCount} onClick={selecting
                            ? () => {}
                            : () => this.togglePayMenu()} color="primary" variant="extendedFab" aria-label="Pay">
                          {
                            selecting && <CreditCard style={{
                                  marginRight: 16
                                }}/>
                          }
                          {
                            selecting && <CallSplit style={{
                                  marginRight: 16
                                }}/>
                          }
                          {
                            selecting
                              ? 'Split / transfer'
                              : 'Pay my bill'
                          }
                        </Button>
                      </div>
                    </ClickAwayListener>
                }
                {
                  !meSelected && <ResponsiveContainer>
                      <div style={{
                          display: 'flex'
                        }}>
                        <Typography style={{
                            flex: 1
                          }}>
                          Sub total
                        </Typography>
                        <Typography>
                          {FN.formatPrice({amount: subtotalAmount, currency})}
                        </Typography>
                      </div>
                      <Grid style={{
                          width: '100%',
                          justifyContent: 'center'
                        }} container spacing={16}>
                        <Grid item>
                          <Button onClick={() => {}} color="primary" variant="extendedFab" aria-label="Pay">
                            <AlignBottom style={{
                                marginRight: 16
                              }} className={classes.extendedIcon}/>
                            Transfer in
                          </Button>
                        </Grid>
                        <Grid item>
                          <Button onClick={() => {}} color="primary" variant="extendedFab" aria-label="Pay">
                            <AlignTop style={{
                                marginRight: 16
                              }} className={classes.extendedIcon}/>
                            Transfer out
                          </Button>
                        </Grid>
                      </Grid>
                    </ResponsiveContainer>
                }
              </ResponsiveContainer>
            </div>
          })
        }
      </div>

      <PaymentOptionsDialog open={payMenuOpen} onClose={this.handleClose}/>
    </div>)
  }
}

Bill = connect(state => ({seats: state.seat.seats, selecting: checkSelecting(state), gratitude: state.bill.gratitude, loggedUserId: state.user.loggedUserId}), {
  fetchBill: fetchBillInit,
  fetchSeats: fetchSeatsInit,
  setGratitude: setGratitudeAction,
  splitBill: splitBillInit,
  transferBill: transferBillInit,
  initTransaction: initTransactionInit
})(Bill)

export default withStyles(styles)(Bill);
