import React, { useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router';
import { AppBarAction, AppBar, AppBarTitle } from '../../components/app-bar';
import { useAction } from '@dinify/common/src/lib/util';
import { getRestaurantBySubdomain } from '../../../features/restaurant/selectors';
import { fetchRestaurantAsync } from '../../../features/restaurant/actions';
import { fetchMenuCategoriesAsync } from '../../../features/menuCategory/actions';
import { useSelector } from 'react-redux';
import { RootState } from 'typesafe-actions';
import { Restaurant } from 'RestaurantModels';
import { Carousel } from '../../components/carousel';
import { IconButton, Typography } from '@material-ui/core';
import Share from '@material-ui/icons/ShareRounded';
import Info from '@material-ui/icons/InfoRounded';
import RestaurantMenu from '@material-ui/icons/RestaurantMenuRounded';
import FavoriteToggle from '../../components/FavoriteToggle';
import * as routes from '../../routes';
import { useTranslation } from '@dinify/common/src/lib/i18n';
import { getCategoriesBySubdomain } from '../../../features/menuCategory/selectors';
import MenuCategory from './menu-category';

export default () => {
  const history = useHistory();
  const params = useParams<{ subdomain: string }>();
  const { t } = useTranslation();
  const [favorite, setFavorite] = useState(false);
  const handleBack = () => {
    history.goBack();
  };
  const handleShare = () => {
    try {
      (navigator as any).share({
        title: 'dinify.app',
        url: document.location.href,
        text: restaurant && restaurant.name,
      });
    }
    catch (e) { console.log(e); }
  };
  const handleInfo = () => {
    history.push(routes.INFO.replace(':subdomain', params.subdomain));
  };
  const restaurant = useSelector<RootState, Restaurant>(state => getRestaurantBySubdomain(state, params.subdomain));
  const menuCategoryIds = useSelector<RootState, string[]>(state => getCategoriesBySubdomain(state, params.subdomain));
  const fetchRestaurant = useAction(fetchRestaurantAsync.request);
  const fetchMenucategories = useAction(fetchMenuCategoriesAsync.request);
  useEffect(() => {
    fetchRestaurant({ subdomain: params.subdomain });
    fetchMenucategories({ subdomain: params.subdomain });
  }, []);

  return <>
    <AppBar style={{ padding: 0 }} type="gradient">
      <AppBarAction color="inherit" type="back" onClick={handleBack} />
      <AppBarTitle color="inherit" title={restaurant && restaurant.name} />
      <FavoriteToggle checked={favorite} onChange={() => setFavorite(!favorite)} />
      {(navigator as any).share &&
        <IconButton color="inherit" onClick={handleShare}>
          <Share />
        </IconButton>
      }
      <IconButton color="inherit" onClick={handleInfo}>
        <Info />
      </IconButton>
    </AppBar>
    <Carousel style={{
      marginTop: -48,
    }} alt={restaurant && restaurant.name} images={restaurant ? restaurant.images : []} />
    <div style={{
      // padding: 16
      width: '100vw'
    }}>
      <div style={{
        width: '100%',
        display: 'flex',
        alignItems: 'center',
        padding: 16,
      }}>
        <RestaurantMenu color="primary" />
        <div style={{ padding: '0 16px' }}>
          <Typography variant="subtitle1">{t('menu.title')}</Typography>
          <Typography variant="caption">
            {restaurant && t('menu.caption', [restaurant.name])}
          </Typography>
        </div>
      </div>
      {menuCategoryIds.map((id, i) => (
        <MenuCategory key={id} menuCategoryId={id} />
      ))}
    </div>
  </>;
}