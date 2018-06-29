// @flow
import React from 'react';
import { withStyles } from '@material-ui/core/styles';

import Typography from 'web/components/Typography';
import * as FN from 'lib/FN';
import uniqueId from 'lodash.uniqueid';

const styles = theme => ({
  cartItemImage: {
    width: 56,
    height: 56,
    borderRadius: 4,
    backgroundColor: theme.palette.divider,
    overflow: 'hidden'
  },
  imageSrc: {
    width: '100%',
    height: '100%',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
  },
});

const CartItem = ({
  classes,
  item
}) => {
    const customizations = [];
    const choices = FN.MapToList(item.choices);
    const addons = FN.MapToList(item.addons);
    const images = item.menu_item ? FN.MapToList(item.menu_item.images) : [];
    customizations.push(...choices.map(choice => {
      return {
        name: choice.name,
        price: FN.formatPrice(choice.difference)
      }
    }));
    customizations.push(...addons.map(addon => {
      return {
        name: addon.name,
        price: FN.formatPrice(addon.price)
      }
    }));

    // if (item.menu_item.addons.length || item.menu_item.excludes.length)
    return <div style={{display: 'flex', padding: 8}} key={uniqueId()}>
      <div className={classes.cartItemImage}>
        {images.length &&
          <div
            className={classes.imageSrc}
            style={{
              backgroundImage: `url(${images[0].url})`
            }}
          />
        }
      </div>
      <div style={{flex: 1, marginLeft: 16}}>
        <div style={{display: 'flex'}}>
          <Typography style={{flex: 1, marginRight: 32}} variant="body1">
            {item.menu_item && item.menu_item.name}
          </Typography>
          <Typography
            style={{alignSelf: 'flex-end'}}
            variant="overline">
            {item.menu_item && FN.formatPrice(item.menu_item.price)}
          </Typography>
        </div>
        {customizations.length ? customizations.map(customization =>
          <div key={uniqueId()} style={{display: 'flex'}}>
            <Typography style={{flex: 1, marginRight: 32}} variant="caption">
              {customization.name}
            </Typography>
            <Typography
              color="textSecondary"
              style={{alignSelf: 'flex-end'}}
              variant="overline">
              {customization.price}
            </Typography>
          </div>
        ) :
          <Typography variant="caption">
            original
          </Typography>
        }
      </div>
    </div>
}

export default withStyles(styles)(CartItem);
