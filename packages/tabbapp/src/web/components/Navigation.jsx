// @flow
import React from 'react';
import { withStyles } from '@material-ui/core/styles';

import ShoppingCart from '@material-ui/icons/ShoppingCartRounded';
import QRCodeScan from 'icons/QRCodeScan';
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
    return (
      <div style={style} className={classes.root}>
        <Divider/>
        <BottomNavigation
          color="primary"
          value={value}
          onChange={handleChange}
          showLabels
        >
          <BottomNavigationAction label="Explore" icon={<LocationOn />} />
          <BottomNavigationAction label="Eat" icon={<RestaurantMenu />} />
          {checkedInRestaurant || process.env.REACT_APP_CAMERA_SCANNER_ENABLED === 'false' ?
            <BottomNavigationAction label="Service" icon={<NotificationsActive />} /> :
            <BottomNavigationAction label="Check in" icon={<QRCodeScan />} />
          }
        </BottomNavigation>
      </div>

    );
}

export default withStyles(styles)(Navigation);
