import React, { useEffect } from 'react';
import { useParams } from 'react-router';
import { useAction } from '@dinify/common/src/lib/util';
import { getRestaurantBySubdomain } from '../../../features/restaurant/selectors';
import { fetchRestaurantAsync } from '../../../features/restaurant/actions';
import { fetchMenuCategoriesAsync } from '../../../features/menuCategory/actions';
import { useSelector } from 'react-redux';
import { RootState } from 'typesafe-actions';
import { Restaurant } from 'RestaurantModels';
import { Carousel } from '../../components/carousel';
import { Typography } from '@material-ui/core';
import RestaurantMenu from '@material-ui/icons/RestaurantMenuRounded';
import { useTranslation } from '@dinify/common/src/lib/i18n';
import { getCategoriesBySubdomain } from '../../../features/menuCategory/selectors';
import MenuCategory from './menu-category';
import Header from './header-simple';

export default () => {
  const params = useParams<{ subdomain: string }>();
  const { t } = useTranslation();
  const restaurant = useSelector<RootState, Restaurant>(state => getRestaurantBySubdomain(state, params.subdomain));
  const menuCategoryIds = useSelector<RootState, string[]>(state => getCategoriesBySubdomain(state, params.subdomain));
  const fetchRestaurant = useAction(fetchRestaurantAsync.request);
  const fetchMenucategories = useAction(fetchMenuCategoriesAsync.request);
  useEffect(() => {
    fetchRestaurant({ subdomain: params.subdomain });
    fetchMenucategories({ subdomain: params.subdomain });
  }, []);

  return <>
    <Header />
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