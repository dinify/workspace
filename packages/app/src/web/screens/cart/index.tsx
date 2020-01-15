import React, { useState } from 'react';
import { useTranslation } from '@dinify/common/src/lib/i18n';
import { useSelector } from 'react-redux';
import Fab from '@material-ui/core/Fab';
import QRCode from 'qrcode.react';
import { AppBar, AppBarAction, AppBarTitle } from '../../components/app-bar';
import CartItem from './cart-item';
import { RootState } from 'typesafe-actions';

import { Subtotal } from 'CartModels';
import { Restaurant } from 'RestaurantModels';

import { orderAsync } from '../../../features/cart/actions';
import { getOrderItemIds } from '../../../features/cart/selectors';
import RestaurantMenu from '@material-ui/icons/RestaurantMenuRounded';
import { Typography } from '@material-ui/core';
import { useAction } from '@dinify/common/src/lib/util';
import Price from '@dinify/common/src/components/price';

export const CartScreen: React.FC<{
  onClose?: () => void;
}> = ({
  onClose = () => { },
  ...otherProps
}) => {
  const [editMode, setEditMode] = useState(false);
  const { t } = useTranslation();

  const checkedInRestaurant = useSelector<RootState, any>(state => state.restaurant.checkedInRestaurant);
  const orderItemIds = useSelector<RootState, string[]>(state => getOrderItemIds(state.cart));
  const subtotal = useSelector<RootState, Subtotal>(state => state.cart.subtotal);
  const user = useSelector<RootState, any>(state => state.firebase.auth);
  const restaurant = useSelector<RootState, Restaurant>(state =>
    checkedInRestaurant ? state.restaurant.all[checkedInRestaurant] : null
  );
  const order = useAction(orderAsync.request);

  const cartItemCount = orderItemIds.length;
  const canOrder = cartItemCount > 0 && checkedInRestaurant !== null;
  return (
    <div {...otherProps}>
      <AppBar style={{ position: 'fixed', top: 0, left: 0, right: 0 }}>
        {!editMode && <AppBarAction type="close" onClick={onClose} />}
        <AppBarTitle
          title={t('cart.title')}
          subtitle={t('itemCount', [cartItemCount])}
        />
        <AppBarAction
          type={editMode ? 'done' : 'edit'}
          onClick={() => {
            setEditMode(!editMode);
          }}
        />
      </AppBar>
      <div style={{ padding: '0 16px', marginTop: 56 }}>
        {orderItemIds.map(itemId => (
          <CartItem
            style={{ padding: '8px 0' }}
            key={itemId}
            editMode={editMode}
            orderItemId={itemId}
          />
        ))}
        <div style={{ marginTop: 8, display: 'flex', alignItems: 'center' }}>
          <Typography style={{ flex: 1 }} variant="button">
            {t('total')}
          </Typography>
          <Typography variant="subtitle1">
            <Price original price={subtotal} />
          </Typography>
        </div>
        {restaurant && restaurant.settings.orders ?
        <>
          <Fab
            disabled={!canOrder}
            style={{ marginTop: 16, width: '100%' }}
            variant="extended"
            color="primary"
            onClick={() => order({})}
          >
            <RestaurantMenu style={{ marginRight: 16 }} />
            {t('order.title')}
          </Fab>
          {!canOrder && <Typography style={{ marginTop: 8 }} variant="caption" color="textSecondary">
            {t('order.instruction')}
          </Typography>}
        </>
        :
        <QRCode value={`https://web.dinify.app/takeorder/${user.uid}/${restaurant.id}`} />
        }
        
      </div>
    </div>
  );
};
