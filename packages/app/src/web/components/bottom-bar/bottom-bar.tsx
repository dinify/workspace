import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useSpring, animated } from 'react-spring';
// import { connect } from 'react-redux';
// import { RootState } from 'typesafe-actions';

import { Subtotal } from 'CartModels';

import {
  ShoppingCartRounded as CartIcon,
  ReceiptRounded as BillIcon
} from '@material-ui/icons';
import { Checkbox, MuiThemeProvider } from '@material-ui/core';
// import { getOrderItemCount } from '../../../ducks/cart/selectors';
import BottomBarAction from './bottom-bar-action';
const getTheme = require('@dinify/common/dist/theme').default;

const darkTheme = getTheme({type: 'light'});
let prevCartVisible = false, 
    prevBillVisible = false;
let BottomBar: React.FC<{
  style?: React.CSSProperties,
  cartSubtotal: Subtotal,
  cartItemCount: number,
  billSubtotal: Subtotal,
  billItemCount: number,
}> = ({
  style,
  cartSubtotal,
  cartItemCount,
  billSubtotal,
  billItemCount,
}) => {
  const { t } = useTranslation();
  const cartVisible = cartItemCount > 0;
  const billVisible = billItemCount > 0;
  const showBottomBar = cartVisible || billVisible;
  // const cartOnly = !billVisible && cartVisible;
  // const billOnly = billVisible && !cartVisible;
  const getTransform = ({type}: {type: any}) => {
    const getT = ({cartV, billV}: {cartV: boolean, billV: boolean}) => {
      if (type === 'cart') {
        if (cartV) return 'translate3d(0%, 0, 0)';
        else return 'translate3d(-50%, 0, 0)';
      }
      else if (type === 'bill') {
        // billVisible ? (!cartVisible ? 'translate3d(0%, 0, 0)' : 'translate3d(50%, 0, 0)') : 'translate3d(100%, 0, 0)'
        if (billV) {
          if (cartV) return 'translate3d(50%, 0, 0)';
          else return 'translate3d(0%, 0, 0)';
        }
        else return 'translate3d(100%, 0, 0)';
      }
    };
    if (cartVisible !== prevCartVisible || billVisible !== prevBillVisible) {
      console.log(cartVisible, prevCartVisible, billVisible, prevBillVisible);
    }
    if (showBottomBar) return getT({cartV: cartVisible, billV: billVisible});
    else return getT({cartV: prevCartVisible, billV: prevBillVisible});
  };
  const animatedStyle = useSpring({
    transform: showBottomBar ? 'translate3d(0, 0px, 0)' : 'translate3d(0, 56px, 0)'
  });
  const cartAnimatedStyle = useSpring({
    transform: getTransform({type: 'cart'})
  });
  const billAnimatedStyle = useSpring({
    transform: getTransform({type: 'bill'})
  });
  prevCartVisible = cartVisible;
  prevBillVisible = billVisible;
  const CartAction = animated(({...props}) => (
    <BottomBarAction 
      icon={<CartIcon color="action"/>}
      title={t('cart.title')}
      subtotal={cartSubtotal}
      count={cartItemCount}
      {...props}
    />
  ));
  const BillAction = animated(({...props}) => (
    <BottomBarAction 
      icon={<BillIcon color="action"/>}
      title={t('bill.title')}
      subtotal={billSubtotal}
      count={billItemCount}
      {...props}
    />
  ));
  const palette = darkTheme.palette;
  const commonStyle = {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: palette.background.paper,
    borderTop: `1px solid ${palette.divider}`,
    borderLeft: `1px solid ${palette.divider}`,
  };
  return (
    <MuiThemeProvider theme={darkTheme}>
      <animated.div style={{
        position: 'fixed', 
        display: 'flex',
        height: 56,
        width: '100%',
        borderTop: `1px solid ${palette.divider}`,
        backgroundColor: palette.background.paper,
        bottom: 0,
        color: darkTheme.palette.text.primary,
        ...animatedStyle,
        ...style
      }}>
        <CartAction style={{...commonStyle, ...cartAnimatedStyle}}/>
        <BillAction style={{...commonStyle, ...billAnimatedStyle}}/>
      </animated.div>
    </MuiThemeProvider>
  );
};

/* <Dialog fullScreen open={open} onClose={() => { setOpen(false); }}>
    <CartPage orderItemsList={orderItemsList} onClose={() => { setOpen(false); }} />
</Dialog> */

const StateWrapper: React.FC = ({...otherProps}) => {
  const [cartVisible, setCartVisible] = useState(false);
  const [billVisible, setBillVisible] = useState(false);
  const subtotal: Subtotal = {
    precision: 2,
    amount: 30,
    currency: 'CZK'
  };
  const amount = 5;
  return (
    <div>
      <div style={{position: 'fixed', top: 0, zIndex: 1000}}>
        <Checkbox checked={cartVisible} onClick={() => { setCartVisible(!cartVisible); }}>Cart</Checkbox>
        <Checkbox checked={billVisible} onClick={() => { setBillVisible(!billVisible); }}>Bill</Checkbox>
      </div>
      <BottomBar 
        cartSubtotal={subtotal} 
        billSubtotal={subtotal} 
        cartItemCount={cartVisible ? amount : 0}
        billItemCount={billVisible ? amount : 0}
        {...otherProps}
      />
    </div>
  );
};

export default StateWrapper;

// export default connect(
//   (state: RootState) => ({
//     cartSubtotal: state.cart.subtotal,
//     cartItemCount: getOrderItemCount(state.cart)
//   })
// )(BottomBar);