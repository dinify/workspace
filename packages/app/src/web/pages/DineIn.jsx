import React from 'react';
import { connect } from 'react-redux';
import { withTheme } from '@material-ui/core/styles';
import { useTranslation } from 'react-i18next';

// material-ui
import Typography from '@material-ui/core/Typography';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import CheckCircle from '@material-ui/icons/CheckCircleRounded';
import ChevronRight from '@material-ui/icons/ChevronRightRounded';
import NotificationsActive from '@material-ui/icons/NotificationsActiveRounded';
import ViewList from '@material-ui/icons/ViewListRounded';

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
        <ListItem button>
          <ViewList color="action"/>
          <ListItemText primary={t('dinein.seeMenu')}/>
          <ChevronRight color="action"/>
        </ListItem>
        <ListItem button>
          <NotificationsActive color="action"/>
          <ListItemText primary={t('dinein.callService')}/>
          <ChevronRight color="action"/>
        </ListItem>
      </React.Fragment>}
    </div>
  );
};

export default connect(
  (state) => ({
    restaurantsMap: state.restaurant.all,
    checkedInRestaurant: state.restaurant.checkedInRestaurant
  })
)(withTheme()(DineIn));
