import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { withTheme } from '@material-ui/core/styles';
import ResponsiveContainer from '@dinify/common/src/components/ResponsiveContainer';
import ResponsiveGrid from 'web/components/ResponsiveGrid';
import Typography from '@material-ui/core/Typography';
import RestaurantListItem from 'web/components/RestaurantListItem';
import { fetchRestaurantsAsync } from 'ducks/restaurant/actions.ts';
import { getRestaurantsList } from 'ducks/restaurant/selectors';
import { getGeolocationAsync } from 'ducks/user/actions.ts';

const Main = ({ restaurantsList, fetchRestaurants, getGeolocation }) => {
  
  useEffect(() => {
    fetchRestaurants();
    getGeolocation();
  }, []);

  return (
    <div>
      <ResponsiveContainer>
        <Typography
          style={{ paddingTop: 24 }}
          variant="h5"
          gutterBottom
        >
          Explore nearby places
        </Typography>
        <Typography
          style={{ paddingBottom: 24 }}
          variant="caption"
          color="textSecondary"
          gutterBottom
        >
          more places coming soon, as they join and host their menu on the platform
        </Typography>
        <ResponsiveGrid>
          {restaurantsList.map(restaurant => (
            <RestaurantListItem
              restaurant={restaurant}
              key={restaurant.id}
            />
          ))}
        </ResponsiveGrid>

      </ResponsiveContainer>
    </div>
  );
};

export default connect(
  state => ({
    restaurantsList: getRestaurantsList(state),
  }), {
    fetchRestaurants: fetchRestaurantsAsync.request,
    getGeolocation: getGeolocationAsync.request
  }
)(withTheme()(Main));
