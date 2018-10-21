// @flow
import React from 'react';
import { withStyles } from '@material-ui/core/styles';

import Delete from 'icons/Delete';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
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
  bg: {
    backgroundColor: theme.palette.background.default
  }
});

const CartItem = ({
  classes,
  editing,
  padding,
  rmFromCart,
  item
}) => {
    const customizations = [];
    const choices = FN.MapToList(item.choices);
    const addons = FN.MapToList(item.addons);
    const excludes = FN.MapToList(item.excludes);
    const images = item.menu_item ? FN.MapToList(item.menu_item.images) : [];
    customizations.push(...choices.map(choice => {
      return {
        name: choice.name,
        crossover: false,
        price: choice.difference
      }
    }));
    customizations.push(...addons.map(addon => {
      return {
        name: addon.name,
        crossover: false,
        price: FN.formatPrice(addon.price)
      }
    }));
    customizations.push(...excludes.map(ingredient => {
      return {
        name: ingredient.name,
        crossover: true
      }
    }));

    // if (item.menu_item.addons.length || item.menu_item.excludes.length)
    return (
      <div
        className={classes.bg}
        style={{
          minWidth: '100%', display: 'flex', alignItems: 'top',
          paddingLeft: padding ? 16 : 0,
          paddingRight: padding ? 16 : 0,
        }} >
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
        <div style={{flex: 1, marginLeft: 16, position: 'relative'}}>
          <div style={{display: 'flex'}}>
            <Typography style={{flex: 1, marginRight: 32}} >
              {item.menu_item && item.menu_item.name}
            </Typography>
            <Typography
              variant="overline"
              style={{alignSelf: 'flex-end', opacity: editing ? 0 : 1}}>
              {item.menu_item && FN.formatPrice(item.menu_item.price)}
            </Typography>
          </div>
          {customizations.length ? customizations.map(customization =>
            <div key={uniqueId()} style={{display: 'flex'}}>
              <Typography style={{
                flex: 1,
                marginRight: 32,
                textDecoration: customization.crossover ? 'line-through' : 'none',
              }} color="textSecondary" variant="caption">
                {customization.name}
              </Typography>
              {customization.price && parseFloat(customization.price.amount) > 0 && <Typography
                color="textSecondary"
                style={{
                  alignSelf: 'flex-end',
                  opacity: editing ? 0 : 1,
                }}
                variant="overline">
                {FN.formatPrice(customization.price)}
              </Typography>}
            </div>
          ) :
            <Typography variant="caption" style={{
              opacity: editing ? 0 : 1,
            }}>
              original
            </Typography>
          }
          {editing &&
            <div style={{
              position: 'absolute',
              display: 'flex',
              alignItems: 'center',
              top: 0,
              right: 0
            }}>
              <IconButton onClick={() => {rmFromCart({ orderItemId: item.id})}}>
                <Delete />
              </IconButton>
            </div>
          }
        </div>
      </div>
    )
}

export default withStyles(styles)(CartItem);
