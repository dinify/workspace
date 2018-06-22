import React from 'react';
import R from 'ramda';
import { connect } from 'react-redux';
import ResponsiveContainer from 'web/components/ResponsiveContainer';
import ResponsiveGrid from 'web/components/ResponsiveGrid';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import ChevronRight from 'icons/ChevronRight';
import RestaurantListItem from 'web/components/RestaurantListItem';
import * as FN from 'lib/FN';

const Main = ({ classes, restaurantsMap }) => {
  const viewMode = 1;
  const restaurantsList = FN.MapToList(restaurantsMap);
  return (
    <div>
      <ResponsiveContainer narrow={viewMode === 2}>
        <Typography
          style={{ paddingTop: '32px' }}
          variant="headline"
          gutterBottom
        >
          Explore local places
        </Typography>
        <ResponsiveGrid lg={viewMode === 2 ? 4 : 3}>
          {restaurantsList.map(restaurant => (
            <RestaurantListItem
              restaurant={restaurant}
              key={restaurant.id}
            />
          ))}
        </ResponsiveGrid>
        <Typography
          style={{ marginBottom: '8px', marginTop: 32 }}
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
  }),
  {},
)(Main);
