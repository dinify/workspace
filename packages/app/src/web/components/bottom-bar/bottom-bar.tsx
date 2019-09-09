import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useSpring, animated } from 'react-spring';
import { connect } from 'react-redux';
import { RootState } from 'typesafe-actions';

import { Subtotal } from 'CartModels';

import { ShoppingCartRounded as CartIcon } from '@material-ui/icons';
import { Checkbox, MuiThemeProvider } from '@material-ui/core';
import { getOrderItemCount } from '../../../ducks/cart/selectors';
import BottomBarAction from './bottom-bar-action';
const getTheme = require('@dinify/common/dist/theme').default;

const darkTheme = getTheme({type: 'dark'});
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
  const CartAction = animated(() => (
    <BottomBarAction 
      icon={<CartIcon color="action"/>}
      title={t('cart.title')}
      subtotal={cartSubtotal}
      count={cartItemCount}
    />
  ));
  const palette = darkTheme.palette;
  return (
    <MuiThemeProvider theme={darkTheme}>
      <div style={{
        position: 'fixed', 
        height: 56,
        width: '100%',
        backgroundColor: palette.background.paper,
        borderTop: `1px solid ${palette.divider}`,
        bottom: 0,
        ...style
      }}>
        {cartItemCount + ' '}
        {billItemCount + ''}
      </div>
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
        billItemCount={cartVisible ? amount : 0}
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