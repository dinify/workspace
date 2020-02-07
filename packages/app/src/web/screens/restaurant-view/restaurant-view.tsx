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
import RestaurantMenu from '@material-ui/icons/RestaurantMenuRounded';
import { useTranslation } from '@dinify/common/src/lib/i18n';
import { getCategoriesBySubdomain } from '../../../features/menuCategory/selectors';
import MenuCategory from './menu-category';
import Header from './header-simple';
import Nav from './nav';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import { StaticMap } from '../../components/map';

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
      width: '100vw'
    }}>
      <Typography style={{ padding: 16 }} variant="h6">
        {restaurant && restaurant.name}
      </Typography>
      <Nav restaurant={restaurant} />
      <Divider />
      <div style={{
        padding: 16,
        width: '100%',
        display: 'flex',
        alignItems: 'center'
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
      <div id="map" style={{ width: '100%' }}>
        <StaticMap restaurant={restaurant} />
      </div>
    </div>
  </>;
}