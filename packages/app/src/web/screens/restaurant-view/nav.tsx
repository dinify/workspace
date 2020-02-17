import React from 'react';
import { useSelector } from 'react-redux';
import Grid from '@material-ui/core/Grid';
import IconButton from '@material-ui/core/IconButton';
import Button from '@material-ui/core/Button';
import FacebookBox from '@dinify/common/src/icons/FacebookBox';
import Instagram from '@dinify/common/src/icons/Instagram';
import CalendarClock from '@dinify/common/src/icons/CalendarClock';
import Place from '@material-ui/icons/PlaceRounded';
import FavoriteToggle from '../../components/FavoriteToggle';
import scrollIntoView from 'scroll-into-view-if-needed';
import { favRestaurantAsync } from '../../../features/restaurant/actions';
import { useTranslation } from '@dinify/common/src/lib/i18n';
import { Restaurant } from 'RestaurantModels';
import { RootState } from 'typesafe-actions';
import { useAction } from '@dinify/common/src/lib/util';
import { useHistory } from 'react-router';
import { useTheme } from '../../../features/ui/selectors';

export interface NavProps {
  restaurant: Restaurant,
  style?: React.CSSProperties
}

const Nav: React.FC<NavProps> = ({ restaurant, style }) => {
  const social = restaurant && restaurant.social;
  const bookingElement = document.getElementById('booking');
  const history = useHistory();
  const favRestaurant = useAction(favRestaurantAsync.request);
  const theme = useTheme();
  const checkedInHere = useSelector<RootState, boolean>(state => state.restaurant.checkedInRestaurant === (restaurant && restaurant.id));
  const { t } = useTranslation();
  return (
    <Grid style={{
      overflow: 'hidden',
      color: theme.palette.text.secondary,
      ...style
    }} container spacing={8}>
      {!!social && !!social.facebook &&
        <Grid item>
          <a style={{ color: 'inherit' }} href={social.facebook} target="_blank" rel="noopener noreferrer">
            <IconButton color="inherit">
              <FacebookBox />
            </IconButton>
          </a>
        </Grid>
      }

      {!!social && !!social.instagram &&
        <Grid item>
          <a style={{ color: 'inherit' }} href={social.instagram} target="_blank" rel="noopener noreferrer">
            <IconButton color="inherit">
              <Instagram />
            </IconButton>
          </a>
        </Grid>
      }

      <Grid item>
        <IconButton
          color="inherit"
          onClick={() => {
            const node = document.getElementById('map');
            if (node) {
              scrollIntoView(node, {
                behavior: 'smooth',
                scrollMode: 'always',
                block: 'start',
              });
            }
          }}>
          <Place />
        </IconButton>
      </Grid>

      <Grid item>
        <FavoriteToggle
          checked={restaurant && restaurant.favorite}
          onChange={() => favRestaurant({
            fav: !restaurant.favorite,
            restaurantId: restaurant.id
          })}
        />
      </Grid>

      {bookingElement !== null && <Grid item>
        <IconButton
          color="inherit"
          onClick={() => {
            scrollIntoView(bookingElement, {
              behavior: 'smooth',
              scrollMode: 'always',
              block: 'start',
            });
          }}>
          <CalendarClock />
        </IconButton>
      </Grid>}
      {restaurant && restaurant.settings && (restaurant.settings.orders || restaurant.settings.serviceCalls) ?
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
        : ''
      }
    </Grid>
  )
}

export default Nav;
