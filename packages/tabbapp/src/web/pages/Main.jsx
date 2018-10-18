import React from 'react';
import { connect } from 'react-redux';
import { withTheme } from '@material-ui/core/styles';
import ResponsiveContainer from 'web/components/ResponsiveContainer';
import ResponsiveGrid from 'web/components/ResponsiveGrid';
import AppBar from 'web/components/AppBar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import ChevronRight from 'icons/ChevronRight';
import RestaurantListItem from 'web/components/RestaurantListItem';
import * as FN from 'lib/FN';

const Main = ({ restaurantsMap, theme }) => {
  const restaurantsList = FN.MapToList(restaurantsMap);
  const iosInstalled = FN.isInstalled() && FN.getPlatform() === 'ios';
  return (
    <div>
      {!iosInstalled && <AppBar />}
      <ResponsiveContainer>
        <Typography
          style={{ paddingTop: 32 }}
          variant="h5"
          gutterBottom
        >
          Explore local places
        </Typography>
        <ResponsiveGrid>
          {restaurantsList.map(restaurant => (
            <RestaurantListItem
              restaurant={restaurant}
              key={restaurant.id}
            />
          ))}
        </ResponsiveGrid>
        <Typography
          style={{ marginBottom: 8, marginTop: 32 }}
          variant="caption"
        >
          455 more
        </Typography>
        <Button variant="outlined" color="secondary">
          <span>Show all</span>
          <ChevronRight style={{ marginLeft: 8 }} />
        </Button>
      </ResponsiveContainer>
    </div>
  );
};

export default connect(
  state => ({
    restaurantsMap: state.restaurant.all,
  })
)(withTheme()(Main));
