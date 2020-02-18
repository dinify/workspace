import React, { useEffect } from 'react';
import { AppBar, AppBarAction } from 'web/components/app-bar';
import { useAction } from '@dinify/common/src/lib/util';
import { fetchRestaurantAsync } from 'features/restaurant/actions';
import { useParams, useHistory } from 'react-router';
import { Restaurant } from 'RestaurantModels';
import { RootState } from 'typesafe-actions';
import { useSelector } from 'react-redux';
import { getRestaurantBySubdomain } from 'features/restaurant/selectors';

export default () => {
  const history = useHistory();
  const handleBack = () => {
    history.goBack();
  };
  const params = useParams<{ subdomain: string }>();
  const fetchRestaurant = useAction(fetchRestaurantAsync.request);
  const restaurant = useSelector<RootState, Restaurant>(state => getRestaurantBySubdomain(state, params.subdomain));
  useEffect(() => {
    fetchRestaurant({ subdomain: params.subdomain });
  }, [fetchRestaurant, params.subdomain]);
  return <>
    <AppBar>
      <AppBarAction type="back" onClick={handleBack} />
    </AppBar>
    <code>
      {JSON.stringify(restaurant)}
    </code>
  </>;
};