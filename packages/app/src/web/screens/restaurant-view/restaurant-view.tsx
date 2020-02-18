import React, { useEffect } from 'react';
import { useParams } from 'react-router';
import { useAction, useBreakpoints } from '@dinify/common/src/lib/util';
import { getRestaurantBySubdomain } from 'features/restaurant/selectors';
import { fetchRestaurantAsync } from 'features/restaurant/actions';
import { fetchMenuCategoriesAsync } from 'features/menuCategory/actions';
import { useSelector } from 'react-redux';
import { RootState } from 'typesafe-actions';
import { Restaurant } from 'RestaurantModels';
import { Carousel } from 'web/components/carousel';
import RestaurantMenu from '@material-ui/icons/RestaurantMenuRounded';
import { useTranslation } from '@dinify/common/src/lib/i18n';
import { getCategoriesBySubdomain } from 'features/menuCategory/selectors';
import MenuCategory from './menu-category';
import Header from './header-simple';
import Nav from './nav';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import { StaticMap } from 'web/components/map';

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

  const match = useBreakpoints({
    0: 3 / 2,
    600: 16 / 9,
    750: 2.39 / 1,
    960: 4 / 1
  });

  const images = restaurant ? restaurant.images : [];
  return <>
    <Header />
    <Carousel aspectRatio={match[1]} imageOptions={{ original: true }} style={{
      marginTop: -48,
    }} alt={restaurant && restaurant.name} images={images} />
    <div style={{
      width: '100vw', // TODO: make responsive
      maxWidth: 960,
      margin: '0 auto'
    }}>
      <Typography style={{ padding: 16 }} variant="h6">
        {restaurant && restaurant.name}
      </Typography>
      <div style={{ maxWidth: '100%', overflow: 'hidden' }}>
        <Nav restaurant={restaurant} />
      </div>
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
      {menuCategoryIds.map(id => (
        <MenuCategory key={id} menuCategoryId={id} />
      ))}
      {restaurant && <a
        href={`https://www.google.com/maps/search/${restaurant.name}/@${restaurant.latitude},${restaurant.longitude},17z`}
        style={{ textDecoration: 'none', display: 'block' }}
      >
        <div id="map" style={{ width: '100%' }}>
          <StaticMap restaurant={restaurant} />
        </div>
      </a>}
    </div>
  </>;
}