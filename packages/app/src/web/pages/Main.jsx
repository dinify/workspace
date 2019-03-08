import React from 'react';
import { connect } from 'react-redux';
import { withTheme } from '@material-ui/core/styles';
import ResponsiveContainer from '@dinify/common/dist/components/ResponsiveContainer';
import ResponsiveGrid from 'web/components/ResponsiveGrid';
import Typography from '@dinify/common/dist/components/Typography';
import RestaurantListItem from 'web/components/RestaurantListItem';
import * as FN from '@dinify/common/dist/lib/FN';

const Main = ({ restaurantsMap }) => {
  const restaurantsList = FN.MapToList(restaurantsMap);
  return (
    <div>
      <ResponsiveContainer>
        <Typography
          style={{ paddingTop: 32 }}
          variant="h5"
          gutterBottom>
          Explore nearby places
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
    restaurantsMap: state.restaurant.all,
  })
)(withTheme()(Main));
