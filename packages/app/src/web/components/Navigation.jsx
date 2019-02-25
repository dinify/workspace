// @flow
import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import { useTranslation } from 'react-i18next';

import QRCodeScan from '@dinify/common/dist/icons/QRCodeScan';
import NotificationsActive from '@material-ui/icons/NotificationsActiveRounded';
import RestaurantMenu from '@material-ui/icons/RestaurantMenuRounded';
import LocationOn from '@material-ui/icons/LocationOnRounded';

import Divider from '@material-ui/core/Divider';
import BottomNavigation from '@material-ui/core/BottomNavigation';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';

const styles = theme => ({
  root: {
    width: '100%',
    position: 'fixed',
    bottom: 0,
    zIndex: 1250
  }
});

const Navigation = ({
  classes,
  handleChange,
  value,
  style,
  checkedInRestaurant
}) => {
  const { t } = useTranslation();
  return (
    <div style={style} className={classes.root}>
      <Divider/>
      <BottomNavigation
        color="primary"
        value={value}
        onChange={handleChange}
        showLabels
      >
        <BottomNavigationAction label={t('nav.explore')} icon={<LocationOn />} />
        <BottomNavigationAction label={t('nav.eat')} icon={<RestaurantMenu />} />
        {checkedInRestaurant || process.env.REACT_APP_CAMERA_SCANNER_ENABLED === 'false' ?
          <BottomNavigationAction label={t('nav.service')} icon={<NotificationsActive />} /> :
          <BottomNavigationAction label={t('nav.checkIn')} icon={<QRCodeScan />} />
        }
      </BottomNavigation>
    </div>

  );
}

export default withStyles(styles)(Navigation);
