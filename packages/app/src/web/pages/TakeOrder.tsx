import React, { useEffect } from 'react';
import { useTranslation } from '@dinify/common/src/lib/i18n';
import { useSelector } from 'react-redux';
import { useRouteMatch } from 'react-router';
import { AppBar, AppBarTitle } from '../components/app-bar';
import { RootState } from 'typesafe-actions';
import { Cart } from 'CartModels';

import { fetchUserCartAsync } from '../../features/cart/actions';
import { Typography } from '@material-ui/core';
import { useAction } from '@dinify/common/src/lib/util';
import Price from '@dinify/common/src/components/price';

export const TakeOrder: React.FC<{
  onClose?: () => void;
}> = ({
  onClose = () => { },
  ...otherProps
}) => {
  const { t } = useTranslation();

  const match = useRouteMatch<{ userId: string, restaurantId: string }>();
  const { userId, restaurantId } = match ? match.params : { userId: null, restaurantId: null };
  const fetchUserCart = useAction(fetchUserCartAsync.request);

  useEffect(() => {
    if (userId && restaurantId) {
      fetchUserCart({ userId, restaurantId });
    }
  }, [userId, restaurantId])

  const cart = useSelector<RootState, Cart>(state => state.cart.guestsCart);

  if (!cart || cart.restaurantId !== restaurantId || cart.userId !== userId) return <></>;

  return (
    <div {...otherProps}>
      <AppBar style={{ position: 'fixed', top: 0, left: 0, right: 0 }}>
        <AppBarTitle
          title={t('cart.title')}
          subtitle={t('itemCount', [cart.items.length])}
        />
      </AppBar>
      <div style={{ padding: '0 16px', marginTop: 56 }}>
        {cart.items.map(item => (
          <div key={item.id}>
            {item.menuItem.translations[0].name}
          </div>
        ))}

        <div style={{ marginTop: 8, display: 'flex', alignItems: 'center' }}>
          <Typography style={{ flex: 1 }} variant="button">
            {t('total')}
          </Typography>
          <Typography variant="subtitle1">
            <Price original price={cart.subtotal} />
          </Typography>
        </div>
        
      </div>
    </div>
  );
};
