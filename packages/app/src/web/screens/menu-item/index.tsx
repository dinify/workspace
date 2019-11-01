import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { MenuItem, MenuItemTranslation } from 'MenuItemsModels';
import { RootState } from 'typesafe-actions';
import { useRouteMatch } from 'react-router';
import { toPairs } from 'ramda';
import {
  favMenuitemInit,
  fetchMenuItemAsync,
  clearCustomizationsAction,
} from '../../../ducks/menuItem/actions';
import Carousel from '../../components/Carousel';
import Divider from '@material-ui/core/Divider';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import AddShoppingCart from '@material-ui/icons/AddShoppingCartRounded';
import ResponsiveContainer from '@dinify/common/src/components/ResponsiveContainer';
import Price from '../../components/Price';
import FavoriteToggle from '../../components/FavoriteToggle';
import NutritionFacts from '../../pages/MenuItemView/NutritionFacts';
import Fab from '@material-ui/core/Fab';
import { addToCartAsync } from '../../../ducks/cart/actions';
import { AddToCartRequest } from 'CartModels';
import { useTranslation } from '@dinify/common/src/lib/i18n';
import Ingredients from './ingredients';
import Addons from './addons';

type MenuItemTranslated = MenuItem & MenuItemTranslation;

export const useMenuItem = (menuItemId: string | null) => {
  return useSelector<RootState, MenuItemTranslated | null>(state => {
    if (menuItemId) {
      const selected = state.menuItem.all[menuItemId];
      if (selected) {
        // Assuming Accecpt-Language header was set on the request
        return { ...selected.translations[0], ...selected };
      }
    }
    return null;
  });
};

export const MenuItemScreen = ({  }: {}) => {
  const dispatch = useDispatch();
  const match = useRouteMatch<{ id: string }>();
  const { t } = useTranslation();
  const menuItemId = match ? match.params.id : null;
  const menuItem = useMenuItem(menuItemId);
  const imageUrls = useSelector<RootState, string[]>(state => {
    if (!menuItem) return [];
    return toPairs(menuItem.images)
      .sort(([, a], [, b]) => b.precedence - a.precedence)
      .map(([, img]) => img.url);
  });
  useEffect(() => {
    if (menuItemId) {
      dispatch(clearCustomizationsAction({ menuItemId }));
      dispatch(fetchMenuItemAsync.request({ menuItemId }));
    }
  }, [menuItemId]);

  if (!menuItem) return null;

  const handleToggleFavorite = () =>
    dispatch(
      favMenuitemInit({
        fav: !menuItem.favorite,
        id: menuItem.id,
      }),
    );

  const handleAddToCart = (payload: Partial<AddToCartRequest>) =>
    dispatch(addToCartAsync.request(payload as any));

  return (
    <div>
      {imageUrls.length > 0 && <Carousel images={imageUrls} />}
      <ResponsiveContainer>
        <Grid container spacing={16} style={{ marginTop: 16 }}>
          <Grid item xs={12} md={6}>
            <Grid container spacing={0}>
              <Grid item style={{ flex: 1 }}>
                <Typography variant="h6">{menuItem.name}</Typography>
                <Typography gutterBottom variant="subtitle1">
                  <Price price={menuItem.price} />
                </Typography>
              </Grid>
              <Grid item>
                <FavoriteToggle
                  checked={menuItem.favorite}
                  onChange={handleToggleFavorite}
                />
              </Grid>
            </Grid>
            <Typography>{menuItem.description}</Typography>
            {menuItem.calories && (
              <div style={{ marginTop: 16 }}>
                <NutritionFacts calories={menuItem.calories} />
              </div>
            )}
          </Grid>
        </Grid>
        <Grid item xs={12} md={6}>
          <Divider style={{ marginTop: 16 }} />
          <Ingredients menuItemId={menuItem.id} />
          <Addons menuItemId={menuItem.id} />

          <Fab
            onClick={() => handleAddToCart({ menuItemId: menuItem.id })}
            style={{ marginTop: 24, marginBottom: 64, width: '100%' }}
            // disabled={selectCount < options.length && options.length !== 0}
            variant="extended"
            color="primary"
          >
            <AddShoppingCart style={{ marginRight: 16 }} />
            <span>{t('cart.add')}</span>
          </Fab>
        </Grid>
      </ResponsiveContainer>
    </div>
  );
};
