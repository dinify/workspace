import React, { useState } from 'react';
import { AppBarAction, AppBar, AppBarTitle } from '../../components/app-bar';
import FavoriteToggle from '../../components/FavoriteToggle';
import Share from '@material-ui/icons/ShareRounded';
import Info from '@material-ui/icons/InfoRounded';
import IconButton from '@material-ui/core/IconButton';
import { useHistory } from 'react-router';
import { Restaurant } from 'RestaurantModels';
import * as routes from '../../routes';

export interface HeaderProps {
  restaurant: Restaurant
}

const Header: React.SFC<HeaderProps> = ({ restaurant }) => {
  const history = useHistory();
  const [favorite, setFavorite] = useState(false);
  const handleBack = () => {
    history.goBack();
  };
  const handleShare = () => {
    try {
      (navigator as any).share({
        title: 'dinify.app',
        url: document.location.href,
        text: restaurant && restaurant.name,
      });
    }
    catch (e) { console.log(e); }
  };
  const handleInfo = () => {
    history.push(routes.INFO.replace(':subdomain', restaurant.subdomain));
  };
  return (
    <AppBar style={{ padding: 0 }} type="gradient">
      <AppBarAction color="inherit" type="back" onClick={handleBack} />
      <AppBarTitle color="inherit" title={restaurant && restaurant.name} />
      <FavoriteToggle checked={favorite} onChange={() => setFavorite(!favorite)} />
      {(navigator as any).share &&
        <IconButton color="inherit" onClick={handleShare}>
          <Share />
        </IconButton>
      }
      <IconButton color="inherit" onClick={handleInfo}>
        <Info />
      </IconButton>
    </AppBar>
  );
}

export default Header;