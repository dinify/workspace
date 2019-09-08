import React from 'react';
import { useTranslation } from 'react-i18next';
import { connect } from 'react-redux';

import Price from '../../../web/components/Price';

import Typography from '@material-ui/core/Typography';
import ButtonBase from '@material-ui/core/ButtonBase';
import CartIcon from '@material-ui/icons/ShoppingCartRounded';
import { RootState } from 'typesafe-actions';
import { Subtotal, OrderItem } from 'CartModels';
import { getOrderItemCount } from '../../../ducks/cart/selectors';

const CartBar: React.FC<{
  style?: React.CSSProperties,
  onClick?: () => void,
  subtotal: Subtotal,
  count: number
}> = ({
  style,
  subtotal,
  count,
  onClick,
  ...otherProps
}) => {
  console.log(count);
  const { t } = useTranslation();
  return (
    <ButtonBase onClick={onClick} style={{
      position: 'fixed',
      bottom: 0,
      height: 56,
      width: '100vw',
      backgroundColor: '#fff',
      borderTop: '1px solid rgba(0,0,0,0.12)',
      padding: `8px 16px 8px 16px`,
      justifyContent: 'flex-start',
      ...style
    }}>
      <CartIcon color="action" />
      <div style={{textAlign: 'start', padding: '0 16px', flex: 1}}>
        <Typography variant="subtitle1">
          {t('cart.title')}
        </Typography>
        <Typography variant="caption" color="textSecondary">
          FUCK
        </Typography>
      </div>
      <div style={{textAlign: 'end'}}>
        <Typography variant="overline">
          <Price price={subtotal} />
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

export default connect(
  (state: RootState) => ({
    subtotal: state.cart.subtotal,
    count: getOrderItemCount(state.cart)
  })
)(CartBar);
