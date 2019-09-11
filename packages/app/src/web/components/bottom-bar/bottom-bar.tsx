import React from 'react';
import { useTranslation } from 'react-i18next';
import { useSpring, animated } from 'react-spring';
import { connect } from 'react-redux';
import { RootState } from 'typesafe-actions';
import { Subtotal } from 'CartModels';
import { getOrderItemCount } from '../../../ducks/cart/selectors';
import { withTheme } from '@material-ui/core/styles';
import CartIcon from '@material-ui/icons/ShoppingCartRounded';
import BillIcon from '@material-ui/icons/ReceiptRounded';
import BottomBarAction from './bottom-bar-action';

let prevCartVisible = true, 
    prevBillVisible = false;
let BottomBar: React.FC<{
  style?: React.CSSProperties,
  cartSubtotal: Subtotal,
  cartItemCount: number,
  billSubtotal: Subtotal,
  billItemCount: number,
  theme?: any,
  onSelect?: (type: 'cart'|'bill') => void,
}> = ({
  style,
  theme,
  cartSubtotal,
  cartItemCount,
  billSubtotal,
  billItemCount,
  onSelect = () => {},
}) => {
  const { t } = useTranslation();
  const cartVisible = cartItemCount > 0;
  const billVisible = billItemCount > 0;
  const showBottomBar = cartVisible || billVisible;
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
      // console.log(cartVisible, prevCartVisible, billVisible, prevBillVisible);
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
      onClick={() => { onSelect('cart'); }}
      {...props}
    />
  ));
  const BillAction = animated(({...props}) => (
    <BottomBarAction 
      icon={<BillIcon color="action"/>}
      title={t('bill.title')}
      subtotal={billSubtotal}
      count={billItemCount}
      onClick={() => { onSelect('bill'); }}
      {...props}
    />
  ));
  const palette = theme.palette;
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
    <animated.div style={{
      position: 'fixed', 
      display: 'flex',
      height: 56,
      width: '100%',
      borderTop: `1px solid ${palette.divider}`,
      backgroundColor: palette.background.paper,
      bottom: 0,
      color: theme.palette.text.primary,
      ...animatedStyle,
      ...style
    }}>
      <CartAction style={{...commonStyle, ...cartAnimatedStyle}}/>
      <BillAction style={{...commonStyle, ...billAnimatedStyle}}/>
    </animated.div>
  );
};

export default withTheme()(connect(
  (state: RootState) => ({
    cartSubtotal: state.cart.subtotal,
    cartItemCount: getOrderItemCount(state.cart),
    billSubtotal: state.cart.subtotal,
    billItemCount: getOrderItemCount(state.cart)
  })
)(BottomBar));