import React, { useEffect } from 'react';
import { useRouteMatch, useHistory } from 'react-router';
import {
  // favMenuitemInit,
  fetchMenuItemAsync,
  clearCustomizationsAction,
} from 'features/menuItem/actions';
import Divider from '@material-ui/core/Divider';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import AddShoppingCart from '@material-ui/icons/AddShoppingCartRounded';
import ResponsiveContainer from '@dinify/common/src/components/ResponsiveContainer';
import Price from '@dinify/common/src/components/price';
// import FavoriteToggle from 'web/components/FavoriteToggle';
import NutritionFacts from 'web/pages/MenuItemView/NutritionFacts';
import Fab from '@material-ui/core/Fab';
import { addToCartAsync } from 'features/cart/actions';
import { useTranslation } from '@dinify/common/src/lib/i18n';
import Ingredients from './ingredients';
import Addons from './addons';
import Options from './options';
import { useAddonView } from 'features/addon/selectors';
import { useIngredientView } from 'features/ingredient/selectors';
import { useOptionView } from 'features/option/selectors';
import { useAction, useBreakpoints } from '@dinify/common/src/lib/util';
import { useMenuItemView } from 'features/menuItem/selectors';
import { Carousel } from 'web/components/carousel';

export const MenuItemScreen = () => {
  const clearCustomizations = useAction(clearCustomizationsAction);
  const fetchMenuItem = useAction(fetchMenuItemAsync.request);
  // const favMenuitem = useAction(favMenuitemInit);
  const addToCart = useAction(addToCartAsync.request);
  const match = useRouteMatch<{ id: string }>();
  const history = useHistory();
  const { t } = useTranslation();
  const menuItemId = match ? match.params.id : '';
  const menuItem = useMenuItemView(menuItemId);
  const addons = useAddonView(menuItemId);
  const ingredients = useIngredientView(menuItemId);
  const options = useOptionView(menuItemId);
  const canAddCart =
    options
      .map(option => option.choices.filter(choice => choice.selected).length)
      .filter(num => num > 0).length === options.length;

  useEffect(() => {
    if (menuItemId) {
      clearCustomizations({ menuItemId });
      fetchMenuItem({ menuItemId });
    }
  }, [clearCustomizations, fetchMenuItem, menuItemId]);

  const breakpointMatch = useBreakpoints({
    0: 3 / 2,
    600: 16 / 9,
    750: 2.39 / 1,
    960: 4 / 1
  });

  const handleAddCart = () => {
    addToCart({ menuItemId: menuItem.id });
    history.goBack();
  };

  // const handleToggleFavorite = () =>
  //   favMenuitem({
  //     fav: !menuItem.favorite,
  //     id: menuItem.id,
  //   });

  if (!menuItem) return null;
  return (
    <div>
      <Carousel aspectRatio={breakpointMatch[1]} alt={menuItem.name} images={menuItem.images} />
      <ResponsiveContainer style={{ margin: '0 auto' }}>
        <Grid container spacing={2} style={{ marginTop: 16 }}>
          <Grid item xs={12} md={6}>
            <Grid container spacing={0}>
              <Grid item style={{ flex: 1 }}>
                <Typography variant="h6">{menuItem.name}</Typography>
                <Typography gutterBottom variant="subtitle1">
                  <Price price={menuItem.price} />
                </Typography>
              </Grid>
              {/*
                <Grid item>
                  <FavoriteToggle
                    checked={menuItem.favorite}
                    onChange={handleToggleFavorite}
                  />
                </Grid>
                */}
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
          {ingredients.length > 0 && (
            <>
              <Divider style={{ marginTop: 16 }} />
              <Ingredients menuItemId={menuItem.id} />
            </>
          )}
          {addons.length > 0 && (
            <>
              <Divider style={{ marginTop: 16 }} />
              <Addons menuItemId={menuItem.id} />
            </>
          )}
          {options.length > 0 && (
            <>
              <Divider style={{ marginTop: 16 }} />
              <Options menuItemId={menuItem.id} />
            </>
          )}

          <Fab
            onClick={handleAddCart}
            style={{ marginTop: 24, marginBottom: 64, width: '100%' }}
            disabled={!canAddCart}
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
