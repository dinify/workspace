import React from 'react';
import { compose } from 'redux';
import { useTranslation } from 'react-i18next';
import { useSpring, animated } from 'react-spring';
import { connect } from 'react-redux';
import { RootState } from 'typesafe-actions';
import { Subtotal } from 'CartModels';
import { getOrderItemCount as getCartCount } from '../../../ducks/cart/selectors';
import { withTheme } from '@material-ui/core/styles';
import CartIcon from '@material-ui/icons/ShoppingCartRounded';
import BillIcon from '@material-ui/icons/ReceiptRounded';
import BottomBarAction from './bottom-bar-action';

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
  const animatedStyle = useSpring({
    transform: showBottomBar ? 'translate3d(0, 0px, 0)' : 'translate3d(0, 56px, 0)'
  });
  const cartAnimatedStyle = useSpring({
    transform: `translate3d(${(cartVisible ? 0 : -50)}%, 0, 0)`
  });
  const billAnimatedStyle = useSpring({
    transform: `translate3d(${billVisible ? 0 : 100}%, 0, 0)`
  });
  // const palette = theme.palette;

  const commonStyle: React.CSSProperties = {
    position: 'absolute',
    bottom: 0,
    backgroundColor: 'rgb(248,248,248)',
    borderTop: '1px solid rgb(240,240,240)',
    borderLeft: '1px solid rgb(240,240,240)',
  };

  return (
    <animated.div style={{
      position: 'fixed', 
      display: 'flex',
      height: 56,
      width: '100%',
      zIndex: 1250,
      borderTop: commonStyle.borderTop,
      backgroundColor: commonStyle.backgroundColor,
      bottom: 0,
      color: theme.palette.text.primary,
      ...animatedStyle,
      ...style
    }}>
      <animated.div style={{
        ...commonStyle, 
        ...cartAnimatedStyle,
        left: 0,
        right: 0
      }}>
        <BottomBarAction 
          style={{width: '100%', height: '100%'}}
          icon={<CartIcon color="action"/>}
          title={t('cart.title')}
          subtotal={cartSubtotal}
          count={cartItemCount}
          onClick={() => { onSelect('cart'); }}
        />
      </animated.div>
      <animated.div style={{
        ...commonStyle, 
        ...billAnimatedStyle, 
        width: cartVisible ? '50%' : '100%',
        right: 0
      }}>
        <BottomBarAction 
          flipped={true}
          style={{width: '100%', height: '100%'}}
          icon={<BillIcon color="action"/>}
          title={t('bill.title')}
          subtotal={cartVisible ? null : billSubtotal}
          count={billItemCount}
          onClick={() => { onSelect('bill'); }}
        />
      </animated.div>
    </animated.div>
  );
};

export default compose(
  withTheme(),
  connect(
    (state: RootState) => ({
      cartSubtotal: state.cart.subtotal,
      cartItemCount: getCartCount(state.cart),
      billSubtotal: state.transaction.subtotal,
      billItemCount: state.transaction.orderItemsCount
    })
  )
)(BottomBar);
