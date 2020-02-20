import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import ResponsiveContainer from '@dinify/common/src/components/ResponsiveContainer';
import ResponsiveGrid from 'web/components/ResponsiveGrid';
import Typography from '@material-ui/core/Typography';
import RestaurantListItem from './restaurant-list-item';
import { fetchRestaurantsAsync, fetchFavoriteRestaurantsAsync } from 'features/restaurant/actions';
import { getRestaurantsList, RestaurantView } from 'features/restaurant/selectors';
import { getGeolocationAsync } from 'features/user/actions';
import { useTranslation } from '@dinify/common/src/lib/i18n';
import { useAction } from '@dinify/common/src/lib/util';
import { RootState } from 'typesafe-actions';
// import { MapToList } from '@dinify/common/src/lib/FN';

const Main: React.FC = () => {

  const fetchRestaurants = useAction<void>(fetchRestaurantsAsync.request);
  const getGeolocation = useAction<void>(getGeolocationAsync.request);
  const fetchFavoriteRestaurants = useAction<void>(fetchFavoriteRestaurantsAsync.request);
  const restaurantsList = useSelector<RootState, RestaurantView[]>(state => getRestaurantsList(state));
  const { t } = useTranslation();
  useEffect(() => {
    fetchRestaurants();
    getGeolocation();
    fetchFavoriteRestaurants();
    // onComponentMount lifecycle
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  // const favoriteRestaurantsList = useSelector<RootState, Restaurant[]>(state => {
  //   return MapToList(state.restaurant.favorites) as Restaurant[];
  // });

  return (
    <ResponsiveContainer>
      <div style={{
        paddingTop: 24,
        paddingBottom: 24
      }}>
        <Typography variant="h5" gutterBottom>
          {t('browse.title')}
        </Typography>
        <Typography
          variant="caption"
          color="textSecondary"
          gutterBottom
        >
          {t('browse.caption')}
        </Typography>
      </div>
      <ResponsiveGrid style={{
        paddingBottom: 16
      }}>
        {restaurantsList.map(restaurant => (
          <RestaurantListItem restaurant={restaurant} key={restaurant.id} />
        ))}
      </ResponsiveGrid>
    </ResponsiveContainer>
  );
};

export default Main;
