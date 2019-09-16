import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { connect } from 'react-redux';
import Fab from '@material-ui/core/Fab';

import { AppBar, AppBarAction, AppBarTitle } from '../../components/app-bar';
import CartItem from './cart-item';
import { OrderItemN } from 'CartModels';
import TotalPrice from '../TotalPrice';
import { RootState } from 'typesafe-actions';

import { Subtotal } from 'CartModels';
import { orderAsync } from '../../../ducks/cart/actions';
import { getOrderItemIds } from '../../../ducks/cart/selectors';
import RestaurantMenu from '@material-ui/icons/RestaurantMenuRounded';

const CartView: React.FC<{
  onClose?: () => void,
  orderItemIds: string[],
  subtotal: Subtotal,
  order: typeof orderAsync.request
}> = ({ orderItemIds, subtotal, order, onClose = () => {}, ...otherProps}) => {

  const [editMode, setEditMode] = useState(false);
  const { t } = useTranslation();

  const cartItemCount = orderItemIds.length;
    
  return (
    <div {...otherProps}>
      <AppBar style={{ position: 'fixed', top: 0, left: 0, right: 0 }}>
        {!editMode && <AppBarAction type="close" onClick={onClose}/>}
        <AppBarTitle 
          title={t('cart.title')} 
          subtitle={t('cart.itemCount', { count: cartItemCount, context: cartItemCount === 0 ? 'none' : undefined })}/>
        <AppBarAction type={editMode ? 'done' : 'edit'} onClick={() => {setEditMode(!editMode)}}/>
      </AppBar>
      <div style={{ padding: '0 16px', marginTop: 56 }}>
        {orderItemIds.map(itemId =>
          <CartItem style={{ padding: '8px 0' }} key={itemId} editMode={editMode} orderItemId={itemId}/>
        )}
        <TotalPrice price={subtotal} />
        <Fab
          disabled={cartItemCount < 1}
          style={{ marginTop: 16, width: '100%' }}
          variant="extended"
          color="primary"
          onClick={() => order()}>
          <RestaurantMenu style={{ marginRight: 16 }} />
          {t('order')}
        </Fab>
      </div>
    </div>
  );
}

export default connect(
  (state: RootState) => ({
    subtotal: state.cart.subtotal,
    orderItemIds: getOrderItemIds(state.cart)
  }), {
    order: orderAsync.request
})(CartView);