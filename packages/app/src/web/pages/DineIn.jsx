import React from 'react';
import { connect } from 'react-redux';
import { withTheme } from '@material-ui/core/styles';
import { useTranslation } from '@dinify/common/src/lib/i18n';
import { Link } from 'react-router-dom';

// material-ui
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import CheckCircle from '@material-ui/icons/CheckCircleRounded';
import ChevronRight from '@material-ui/icons/ChevronRightRounded';
import NotificationsActive from '@material-ui/icons/NotificationsActiveRounded';
import ViewList from '@material-ui/icons/ViewListRounded';
import Camera from '@material-ui/icons/CameraRounded';

import Eat from './Eat';

const DineIn = ({
  restaurantsMap,
  checkedInRestaurant,
  theme,
  ...otherProps
}) => {
  const { t } = useTranslation();
  const restaurant = restaurantsMap[checkedInRestaurant];
  const checkedin = restaurant !== null && restaurant !== undefined;
  return (
    <div>
      {checkedin && <div style={{
        backgroundColor: theme.palette.divider,
        padding: 16,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
      }}>
        <div style={{flex: 1}}>
          <Typography variant="h6">
            {restaurant.name}
          </Typography>
          <Typography variant="caption" style={{marginTop: 4}}>
            {t('dinein.checkedin')}
          </Typography>
        </div>
        <CheckCircle style={{color: theme.palette.background.paper}}/>
      </div>}
      {checkedin && <React.Fragment>
        <Typography variant="overline" color="textSecondary" style={{margin: 16}}>
          {t('dinein.actions')}
        </Typography>
        <ListItem button component={({children, ...other}) => (
          <Link to={`/restaurant/${restaurant.subdomain}`} {...other}>{children}</Link>
        )}>
          <ViewList color="action"/>
          <ListItemText primary={t('dinein.seeMenu')}/>
          <ChevronRight color="action"/>
        </ListItem>
        <ListItem button component={({children, ...other}) => (
          <Link to="/dinein/services" {...other}>{children}</Link>
        )}>
          <NotificationsActive color="action"/>
          <ListItemText primary={t('dinein.callService')}/>
          <ChevronRight color="action"/>
        </ListItem>
      </React.Fragment>}
      {!checkedin &&
        <div>
          <Typography style={{margin: 16}}>
            {t('cart.checkInInstructions')}
          </Typography>
          <Button variant="contained" color="primary" style={{boxShadow: 'none', marginLeft: 16, marginRight: 16, ...theme.typography.button2}}
          component={({children, ...other}) => (
            <Link to="/dinein/camera" {...other}>{children}</Link>
          )}>
            <Camera style={{marginRight: 8}}/>
            Open camera
          </Button>
        </div>
      }
      <Eat/>
    </div>
  );
};

export default connect(
  (state) => ({
    restaurantsMap: state.restaurant.all,
    checkedInRestaurant: state.restaurant.checkedInRestaurant
  })
)(withTheme()(DineIn));
