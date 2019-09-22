import React from 'react';
import { compose } from 'redux';
import { useTranslation } from 'react-i18next';
import { useSpring, animated } from 'react-spring';
import { connect } from 'react-redux';
import { RootState } from 'typesafe-actions';
import { Subtotal } from 'CartModels';
import { getOrderItemCount as getCartCount } from '../../../ducks/cart/selectors';
import { select } from '../../../lib/platform';
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
    transform: `translate3d(${(cartVisible ? 0 : -50)}%, 0, 0)`,
    opacity: cartVisible ? 1 : 0
  });
  const billAnimatedStyle = useSpring({
    transform: `translate3d(${billVisible ? 0 : 50}%, 0, 0)`,
    opacity: billVisible ? 1 : 0
  });
  const { palette: { type, background: { paper }, divider }} = theme;

  const commonStyle: React.CSSProperties = {
    position: 'absolute',
    bottom: 0
  };

  const coupertino = {
    backgroundColor: theme.coupertino.backgroundColor,
    WebkitBackdropFilter: theme.coupertino.backdropFilter,
    backdropFilter: theme.coupertino.backdropFilter,
    borderTop: `1px solid ${theme.coupertino.borderColor}`
  };
  const conidionalStyle = select({
    standard: {
        backgroundColor: paper,
        borderTop: `1px solid ${divider}`
    },
    osx: coupertino,
    ios: coupertino
  });

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
      ...conidionalStyle,
      ...style
    }}>
      <animated.div style={{
        ...commonStyle, 
        ...cartAnimatedStyle,
        width: billVisible ? '50%' : '100%',
        left: 0,
        right: 0
      }}>
        <BottomBarAction 
          scrim={select({
            ios: type === 'dark' ? 'dark' : 'none', 
            osx: type === 'dark' ? 'dark' : 'none', 
            standard: type === 'light' ? 'dark' : 'none'
          })}
          scrimAlpha={select({ ios: 0.54, osx: 0.45, standard: 0.12 })}
          style={{width: '100%', height: '100%'}}
          icon={<CartIcon color="action"/>}
          title={t('cart.title')}
          subtotal={billVisible ? null : cartSubtotal}
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
          scrim={select({
            ios: type === 'light' ? 'light' : 'none', 
            osx: type === 'light' ? 'light' : 'none', 
            standard: type === 'dark' ? 'light' : 'none'
          })}
          scrimAlpha={select({ ios: 0.54, osx: 0.45, standard: 0.12 })}
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
