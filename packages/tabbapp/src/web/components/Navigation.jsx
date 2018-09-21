// @flow
import React from 'react';
import { withStyles } from '@material-ui/core/styles';

import ShoppingCart from 'icons/ShoppingCart';
import QRCodeScan from 'icons/QRCodeScan';
import NotificationsActive from 'icons/NotificationsActive';
import Receipt from 'icons/Receipt';
import LocationOn from 'icons/LocationOn';

import Divider from '@material-ui/core/Divider';
import BottomNavigation from '@material-ui/core/BottomNavigation';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';

const styles = theme => ({
  root: {
    width: '100%',
    position: 'fixed',
    bottom: 0,
  }
});

const Navigation = ({
  classes,
  handleChange,
  value,
  checkedInRestaurant
}) => {
    return (
      <div className={classes.root}>
        <Divider/>
        <BottomNavigation
          color="primary"
          value={value}
          onChange={handleChange}
          showLabels
        >
          <BottomNavigationAction label="Explore" icon={<LocationOn />} />
          <BottomNavigationAction label="Cart" icon={<ShoppingCart />} />
          <BottomNavigationAction label="Bill" icon={<Receipt />} />
          {checkedInRestaurant || process.env.REACT_APP_CAMERA_SCANNER_ENABLED === 'false' ?
            <BottomNavigationAction label="Service" icon={<NotificationsActive />} /> :
            <BottomNavigationAction label="Check in" icon={<QRCodeScan />} />
          }
        </BottomNavigation>
      </div>

    );
}

export default withStyles(styles)(Navigation);
