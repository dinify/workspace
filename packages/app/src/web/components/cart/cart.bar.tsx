import React from 'react';
import { useTranslation } from 'react-i18next';

import Price from '../../../web/components/Price';

import Typography from '@material-ui/core/Typography';
import ButtonBase from '@material-ui/core/ButtonBase';
import CartIcon from '@material-ui/icons/ShoppingCartRounded';

import { Cart } from 'CartModels';

const CartBar: React.FC<{
  cart: Cart,
  style?: React.CSSProperties,
  onClick?: () => void
}> = ({
  cart,
  style,
  ...otherProps
}) => {
  const { t } = useTranslation();
  const cartItemCount = (cart && cart.items) ? cart.items.length : 0;
  return (
    <ButtonBase style={{
      position: 'fixed',
      bottom: 0,
      height: 56,
      width: '100vw',
      backgroundColor: '#fff',
      borderTop: '1px solid rgba(0,0,0,0.12)',
      padding: `8px 16px 8px 16px`,
      justifyContent: 'flex-start',
      ...style
    }} {...otherProps}>
      <CartIcon color="action" />
      <div style={{textAlign: 'start', padding: '0 16px', flex: 1}}>
        <Typography variant="subtitle1">
          {t('cart.title')}
        </Typography>
        <Typography variant="caption" color="textSecondary">
          {t('cart.itemCount', { count: cartItemCount, context: cartItemCount === 0 ? 'none' : undefined })}
        </Typography>
      </div>
      <div style={{textAlign: 'end'}}>
        <Typography variant="overline">
          <Price price={cart.subtotal} />
        </Typography>
      </div>
    </ButtonBase>
  );
};

// export default connect(
//   (state: any) => ({
//     cart: state.cart,
//   }),
//   { }
// )(CartBar);

export default CartBar;
