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
import { IconButton } from '@material-ui/core';
import Share from '@material-ui/icons/ShareRounded';
import FavoriteToggle from '../../components/FavoriteToggle';

export default () => {
  const history = useHistory();
  const params = useParams<{ subdomain: string }>();
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
  const restaurant = useSelector<RootState, Restaurant>(state => getRestaurantBySubdomain(state, params.subdomain));
  const fetchRestaurant = useAction(fetchRestaurantAsync.request);
  const fetchMenucategories = useAction(fetchMenuCategoriesAsync.request);
  useEffect(() => {
    fetchRestaurant({ subdomain: params.subdomain });
    fetchMenucategories({ subdomain: params.subdomain });
  }, []);

  return <>
    <AppBar type="gradient">
      <AppBarAction type="back" onClick={handleBack} />
      <AppBarTitle title={restaurant && restaurant.name} />
      <AppBarAction>
        <FavoriteToggle checked={favorite} onChange={() => setFavorite(!favorite)} />
      </AppBarAction>
      {(navigator as any).share && <AppBarAction>
        <IconButton onClick={handleShare}>
          <Share />
        </IconButton>
      </AppBarAction>}
    </AppBar>
    <Carousel style={{
      marginTop: -56,
    }} alt={restaurant && restaurant.name} images={restaurant ? restaurant.images : []} />
  </>;
}