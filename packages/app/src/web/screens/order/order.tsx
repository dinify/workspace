import React, { useEffect } from 'react';
import { useTranslation } from '@dinify/common/src/lib/i18n';
import { useSelector } from 'react-redux';
import { useRouteMatch } from 'react-router';
import { AppBar, AppBarTitle } from '../../components/app-bar';
import { RootState } from 'typesafe-actions';
import { Cart } from 'CartModels';
import Fab from '@material-ui/core/Fab';

import { fetchUserCartAsync, makeCartDoneAsync } from '../../../features/cart/actions';
import { Typography } from '@material-ui/core';
import { useAction } from '@dinify/common/src/lib/util';
import Price from '@dinify/common/src/components/price';
import { getOrderItemIds } from '../../../features/cart/selectors';
import { OrderItem } from '../../components/order-item';

export const OrderScreen: React.FC<{
  onClose?: () => void;
}> = ({
  onClose = () => { },
  ...otherProps
}) => {
  const { t } = useTranslation();

  const match = useRouteMatch<{ userId: string, restaurantId: string }>();
  const { userId, restaurantId } = match ? match.params : { userId: null, restaurantId: null };
  const fetchUserCart = useAction(fetchUserCartAsync.request);
  const makeCartDone = useAction(makeCartDoneAsync.request);
  const orderItemIds = useSelector<RootState, string[]>(state => getOrderItemIds(state.cart));

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
        {orderItemIds.map(itemId => (
          <OrderItem
            style={{ padding: '8px 0' }}
            key={itemId}
            id={itemId}
            expanded
          />
        ))}

        <div style={{ marginTop: 8, display: 'flex', alignItems: 'center' }}>
          <Typography style={{ flex: 1 }} variant="subtitle1">
            {t('total')}
          </Typography>
          <Typography variant="subtitle1">
            <Price original price={cart.subtotal} />
          </Typography>
        </div>

        <Fab
          disabled={!cart.items || cart.items.length < 1 || cart.done}
          style={{ marginTop: 16, width: '100%' }}
          variant="extended"
          color="primary"
          onClick={() => makeCartDone({ userId, restaurantId })}
        >
          {t('done')}
        </Fab>

      </div>
    </div>
  );
};
