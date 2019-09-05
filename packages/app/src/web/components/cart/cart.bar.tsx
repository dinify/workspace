import React from 'react';
import { useTranslation } from 'react-i18next';

import Typography from '@material-ui/core/Typography';

const CartBar: React.FC<{
  cart: any,
  style?: React.CSSProperties,
  onClick?: () => void
}> = ({
  cart,
  style,
  ...otherProps
}) => {
  const { t } = useTranslation();
  const cartItemCount = cart && cart.count !== undefined ? cart.count : 0;
  return (
    <div style={{
      position: 'fixed',
      bottom: 0,
      height: 56,
      width: '100vw',
      backgroundColor: '#fff',
      borderTop: '1px solid rgba(0,0,0,0.12)',
      padding: `8px 16px 8px 16px`,
      ...style
    }} {...otherProps}>
      <Typography variant="subtitle1">
        {t('cart.title')}
      </Typography>
      <Typography variant="caption">
        {t('cart.itemCount', { count: cartItemCount, context: cartItemCount === 0 ? 'none' : undefined })}
      </Typography>
    </div>
  );
};

// export default connect(
//   (state: any) => ({
//     cart: state.cart,
//   }),
//   { }
// )(CartBar);

export default CartBar;
