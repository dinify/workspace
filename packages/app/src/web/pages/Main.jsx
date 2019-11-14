import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { withTheme } from '@material-ui/core/styles';
import ResponsiveContainer from '@dinify/common/src/components/ResponsiveContainer';
import ResponsiveGrid from 'web/components/ResponsiveGrid';
import Typography from '@material-ui/core/Typography';
import RestaurantListItem from 'web/components/RestaurantListItem';
import { fetchRestaurantsAsync } from 'features/restaurant/actions.ts';
import { getRestaurantsList } from 'features/restaurant/selectors';
import { getGeolocationAsync } from 'features/user/actions.ts';
import { useTranslation } from '@dinify/common/src/lib/i18n';

const Main = ({ restaurantsList, fetchRestaurants, getGeolocation }) => {
  const { t } = useTranslation();
  useEffect(() => {
    fetchRestaurants();
    getGeolocation();
  }, []);

  return (
    <div>
      <ResponsiveContainer>
        <Typography style={{ paddingTop: 24 }} variant="h5" gutterBottom>
          {t('browse.title')}
        </Typography>
        <Typography
          style={{ paddingBottom: 24 }}
          variant="caption"
          color="textSecondary"
          gutterBottom
        >
          {t('browse.caption')}
        </Typography>
        <ResponsiveGrid>
          {restaurantsList.map(restaurant => (
            <RestaurantListItem restaurant={restaurant} key={restaurant.id} />
          ))}
        </ResponsiveGrid>
      </ResponsiveContainer>
    </div>
  );
};

export default connect(
  state => ({
    restaurantsList: getRestaurantsList(state),
  }),
  {
    fetchRestaurants: fetchRestaurantsAsync.request,
    getGeolocation: getGeolocationAsync.request,
  },
)(withTheme()(Main));
