import React, { useEffect } from 'react';
import { useTranslation } from '@dinify/common/src/lib/i18n';
import { useSelector } from 'react-redux';
import { useRouteMatch } from 'react-router';
import { AppBar, AppBarTitle } from '../components/app-bar';
import { RootState } from 'typesafe-actions';
import { Cart } from 'CartModels';
import Fab from '@material-ui/core/Fab';

import { fetchUserCartAsync, makeCartDoneAsync } from '../../features/cart/actions';
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
  const makeCartDone = useAction(makeCartDoneAsync.request);

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

        {cart.items.map(({ menuItem }) => (
          <div
          style={{
            minWidth: '100%', display: 'flex', alignItems: 'top',
          }}>
          <div style={{
            width: 56,
            height: 56,
            borderRadius: 4,
            // backgroundColor: theme.palette.divider,
            overflow: 'hidden'
          }}>
            <img src={menuItem.images[0] && `${menuItem.images[0].url}=s112-c`} style={{ width: 56, height: 56 }} />
          </div>
          <div style={{ flex: 1, marginLeft: 16, position: 'relative' }}>
            <div style={{ display: 'flex' }}>
              <Typography style={{ flex: 1, marginRight: 32 }} >
                {menuItem.translations[0].name}
              </Typography>
              <Typography
                variant="overline"
                style={{ alignSelf: 'flex-end', opacity: 1 }}>
                <Price original price={menuItem.price} />
              </Typography>
            </div>
            {/* customizations.length ? customizations.map((customization, i) =>
              <div key={i} style={{ display: 'flex' }}>
                <Typography style={{
                  flex: 1,
                  marginRight: 32,
                  textDecoration: customization.crossover ? 'line-through' : 'none',
                }} color="textSecondary" variant="caption">
                  {customization.name}
                </Typography>
                {customization.price && <Typography
                  color="textSecondary"
                  style={{
                    alignSelf: 'flex-end',
                    opacity: editMode ? 0 : 1,
                  }}
                  variant="overline">
                  {customization.amount && customization.amount > 1 ? `${customization.amount} × ` : ''}
                  {parseFloat(String(customization.price.amount)) > 0 && (
                    <Price original price={customization.price} />
                  )}
                </Typography>}
              </div>
            ) :
              <Typography variant="caption" color="textSecondary" style={{
                opacity: editMode ? 0 : 1,
              }}>
                {t('cart.item.original')}
              </Typography>
            */}
          </div>
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
