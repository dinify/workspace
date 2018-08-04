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
  const social = restaurant.social;
  return (
    <Grid container style={{marginLeft: -16}} spacing={8}>

      {!!social.facebook &&
        <Grid item>
          <a href={social.facebook} target="_blank" rel="noopener noreferrer">
            <IconButton>
              <FacebookBox className={classes.secondary} />
            </IconButton>
          </a>
        </Grid>
      }

      {!!social.instagram &&
        <Grid item>
          <a href={social.instagram} target="_blank" rel="noopener noreferrer">
            <IconButton>
              <Instagram className={classes.secondary} />
            </IconButton>
          </a>
        </Grid>
      }

      <Grid item>
        <IconButton
          target="_blank"
          rel="noopener noreferrer"
          href={`https://www.google.com/maps/search/${restaurant.name}/@${restaurant.latitude},${restaurant.longitude},17z`}>
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
