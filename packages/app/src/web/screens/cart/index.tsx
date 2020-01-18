import React, { useState } from 'react';
import { useTranslation } from '@dinify/common/src/lib/i18n';
import { useSelector } from 'react-redux';
import Fab from '@material-ui/core/Fab';
import QRCode from 'qrcode.react';
import { AppBar, AppBarAction, AppBarTitle } from '../../components/app-bar';
import { RootState } from 'typesafe-actions';

import { Subtotal } from 'CartModels';
import { Restaurant } from 'RestaurantModels';

import { orderAsync } from '../../../features/cart/actions';
import { getOrderItemIds, useCartRestaurant } from '../../../features/cart/selectors';
import RestaurantMenu from '@material-ui/icons/RestaurantMenuRounded';
import Add from '@material-ui/icons/AddRounded';
import { Typography, Button, Divider } from '@material-ui/core';
import { useAction } from '@dinify/common/src/lib/util';
import Price from '@dinify/common/src/components/price';
import { OrderItem } from '../../components/order-item';

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

  const restaurantIdOfCart = useCartRestaurant();

  const order = useAction(orderAsync.request);

  const cartItemCount = orderItemIds.length;
  const canOrder = cartItemCount > 0 && checkedInRestaurant !== null;

  const domain = process.env.REACT_APP_DOMAIN || 'web.dinify.app';
  const orderUrl = `https://${domain}/order/${user.uid}/${restaurantIdOfCart}`;
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
          <OrderItem
            style={{ padding: '8px 0' }}
            key={itemId}
            editMode={editMode}
            id={itemId}
          />
        ))}
        <div style={{ marginTop: 8, display: 'flex', alignItems: 'center' }}>
          <Typography style={{ flex: 1 }} variant="subtitle1">
            {t('total')}
          </Typography>
          <Typography variant="subtitle1">
            <Price original price={subtotal} />
          </Typography>
        </div>
        <div
        style={{  margin: '16px 0', minWidth: '100%', display: 'flex', alignItems: 'top', justifyContent: "flex-end" }} >
          <Button variant="outlined" color="primary">
            Add <Add />
          </Button>
        </div>
      </div>
      <Divider />
      <div style={{ padding: '0 16px', marginTop: 56 }}>
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
        <div style={{textAlign: 'center'}}>
          <Typography style={{ margin: '32px 0 8px 0' }} variant="caption" color="textSecondary">
            To make an order show this code to the waiter
          </Typography>
          <QRCode value={orderUrl} />
        </div>
        }
        
      </div>
    </div>
  );
};
