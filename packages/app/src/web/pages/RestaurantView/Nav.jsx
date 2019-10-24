import React from 'react';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import IconButton from '@material-ui/core/IconButton';
import Button from '@material-ui/core/Button';
import FacebookBox from '@dinify/common/src/icons/FacebookBox';
import Instagram from '@dinify/common/src/icons/Instagram';
import CalendarClock from '@dinify/common/src/icons/CalendarClock';
import Place from '@material-ui/icons/PlaceRounded';
import FavoriteToggle from 'web/components/FavoriteToggle';
import scrollIntoView from 'scroll-into-view-if-needed';
import { favRestaurantAsync } from 'ducks/restaurant/actions.ts';
import { useTranslation } from '@dinify/common/src/lib/i18n';

const styles = theme => ({
  secondary: {
    color: theme.palette.text.secondary
  },
});

let Nav = ({
  classes,
  checkedInRestaurant,
  restaurant,
  favRestaurant,
  history
}) => {
  const social = restaurant.social;
  const bookingElement = document.getElementById('booking');
  const checkedInHere = checkedInRestaurant === restaurant.id;
  const { t } = useTranslation();
  return (
    <Grid container style={{marginLeft: -16}} spacing={8}>

      {!!social && !!social.facebook &&
        <Grid item>
          <a href={social.facebook} target="_blank" rel="noopener noreferrer">
            <IconButton>
              <FacebookBox className={classes.secondary} />
            </IconButton>
          </a>
        </Grid>
      }

      {!!social && !!social.instagram &&
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
          onClick={() => {
            const node = document.getElementById('map');
            scrollIntoView(node, {
              behavior: 'smooth',
              scrollMode: 'always',
              block: 'start',
            });
          }}>
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

      {bookingElement !== null && <Grid item>
        <IconButton
          onClick={() => {
            scrollIntoView(bookingElement, {
              behavior: 'smooth',
              scrollMode: 'always',
              block: 'start',
            });
          }}>
          <CalendarClock className={classes.secondary} />
        </IconButton>
      </Grid>}

      <Button disabled={checkedInHere} style={{
        height: 40, 
        boxShadow: 'none',
        alignSelf: 'center',
        marginLeft: 'auto'
      }} variant="contained" color="primary" onClick={() => {
        history.push("/camera");
      }}>
        {checkedInHere ? t('checkedIn') : t('checkIn')}
      </Button>
    </Grid>
  )
}

Nav = connect(
  (state) => ({
    checkedInRestaurant: state.restaurant.checkedInRestaurant
  }), 
  {
    favRestaurant: favRestaurantAsync.request,
  }
)(Nav)

export default withStyles(styles)(Nav);
