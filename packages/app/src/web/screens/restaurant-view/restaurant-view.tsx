import React, { useEffect } from 'react';
import { useHistory, useParams } from 'react-router';
import { AppBarAction } from '../../components/app-bar';
import { useAction } from '@dinify/common/src/lib/util';
import { getRestaurantBySubdomain } from '../../../features/restaurant/selectors';
import { fetchRestaurantAsync } from '../../../features/restaurant/actions';
import { fetchMenuCategoriesAsync } from '../../../features/menuCategory/actions';
import { useSelector } from 'react-redux';
import { RootState } from 'typesafe-actions';
import { Restaurant } from 'RestaurantModels';
import { Carousel } from '../../components/carousel';

export default () => {
  const history = useHistory();
  const params = useParams<{ subdomain: string }>();
  const handleBack = () => {
    history.goBack();
  };
  const restaurant = useSelector<RootState, Restaurant>(state => getRestaurantBySubdomain(state, params.subdomain));
  const fetchRestaurant = useAction(fetchRestaurantAsync.request);
  const fetchMenucategories = useAction(fetchMenuCategoriesAsync.request);
  useEffect(() => {
    fetchRestaurant({ subdomain: params.subdomain });
    fetchMenucategories({ subdomain: params.subdomain });
  }, []);

  return <>
    <AppBarAction type="back" onClick={handleBack} />
    <Carousel alt={restaurant && restaurant.name} images={restaurant ? restaurant.images : []} />
  </>;
}