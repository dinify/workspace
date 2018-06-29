import React from 'react';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import IconButton from '@material-ui/core/IconButton';
import FacebookBox from 'icons/FacebookBox';
import Instagram from 'icons/Instagram';
import CalendarClock from 'icons/CalendarClock';
import Place from 'icons/Place';
import FavoriteToggle from 'web/components/FavoriteToggle';
import { favRestaurantInit } from 'ducks/restaurant/actions';

const styles = theme => ({
  secondary: {
    color: theme.palette.text.secondary
  },
});

let Nav = ({
  classes,
  restaurant,
  favRestaurant,
}) => {
  return (
    <Grid container style={{marginLeft: -16}} spacing={8}>
      <Grid item>
        <IconButton>
          <FacebookBox className={classes.secondary} />
        </IconButton>
      </Grid>
      <Grid item>
        <IconButton>
          <Instagram className={classes.secondary} />
        </IconButton>
      </Grid>
      <Grid item>
        <IconButton>
          <Place className={classes.secondary} />
        </IconButton>
      </Grid>
      <Grid item>
        <FavoriteToggle
          checked={restaurant.favorite}
          onChange={() => favRestaurant({
            fav: !restaurant.favorite,
            id: restaurant.id
          })}
        />
      </Grid>
      <Grid item>
        <IconButton>
          <CalendarClock className={classes.secondary} />
        </IconButton>
      </Grid>
    </Grid>
  )
}

Nav = connect(null,
  {
    favRestaurant: favRestaurantInit
  }
)(Nav)

export default withStyles(styles)(Nav);
