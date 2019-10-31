import React from 'react';
import { useSelector } from 'react-redux';
import { MenuItem, MenuItemTranslation } from 'MenuItemsModels';
import { RootState } from 'typesafe-actions';
import { useRouteMatch } from 'react-router';
import { toPairs } from 'ramda';
import Carousel from '../../components/Carousel';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import ResponsiveContainer from '@dinify/common/src/components/ResponsiveContainer';
import Price from '../../components/Price';
import FavoriteToggle from '../../components/FavoriteToggle';
import NutritionFacts from '../../pages/MenuItemView/NutritionFacts';

type MenuItemTranslated = MenuItem & MenuItemTranslation;

export const MenuItemScreen = ({  }: {}) => {
  const match = useRouteMatch<{ id: string }>();
  const menuItem = useSelector<RootState, MenuItemTranslated | null>(state => {
    if (match) {
      const selected = state.menuItem.all[match.params.id];
      if (selected) {
        // Assuming Accecpt-Language header was set on the request
        return { ...selected.translations[0], ...selected };
      }
    }
    return null;
  });
  const imageUrls = useSelector<RootState, string[]>(state => {
    if (!menuItem) return [];
    return toPairs(menuItem.images)
      .sort(([, a], [, b]) => b.precedence - a.precedence)
      .map(([, img]) => img.url);
  });
  if (!menuItem) return null;

  // TODO: replace these placeholders
  const favMenuitem = (...args: any[]) => {};
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
                  onChange={() =>
                    favMenuitem({
                      fav: !menuItem.favorite,
                      id: menuItem.id,
                    })
                  }
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
      </ResponsiveContainer>
    </div>
  );
};
