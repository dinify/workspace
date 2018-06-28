// @flow
import React from 'react';
import { withStateHandlers } from 'recompose';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';

import ShoppingCart from 'icons/ShoppingCart';

import Popover from '@material-ui/core/Popover';
import Badge from '@material-ui/core/Badge';
import IconButton from '@material-ui/core/IconButton';
import Divider from '@material-ui/core/Divider';
import Typography from 'web/components/Typography';
import CartItem from './CartItem';
import * as FN from 'lib/FN';
import uniqueId from 'lodash.uniqueid';

const styles = theme => ({
  primary: {
    color: theme.palette.text.primary
  },
  secondary: {
    color: theme.palette.text.secondary
  },
  rounded: {
    borderRadius: 20,
    border: `1px solid ${theme.palette.divider}`
  },
  popover: {
    boxShadow: theme.shadows[2]
  },
});

const Cart = ({
  classes,
  cartMenuOpen,
  handleCartMenuToggle,
  handleCartMenuClose,
  anchor,
  cart
}) => {

  const cartItems = [];
  Object.keys(cart).map(key => cartItems.push(...cart[key]));

  return (
    <div>
      <IconButton
        onClick={handleCartMenuToggle}
        style={{marginRight: 16}}>
        <Badge badgeContent={cartItems.length} color="primary">
          <ShoppingCart />
        </Badge>
      </IconButton>
      <Popover
        classes={{paper: classes.popover}}
        open={cartMenuOpen}
        anchorEl={anchor}
        onClose={handleCartMenuClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'center',
        }}>
        <div>
          <div style={{padding: 8}}>
            {cartItems.map(item =>
              <CartItem item={item}/>
            )}
          </div>
          <Divider />
          <div style={{display: 'flex', alignItems: 'center', padding: 16}}>
            <Typography style={{flex: 1}} variant="button">
              Total
            </Typography>

            <Typography variant="subheading">
              {FN.formatPrice({amount: '233.130', currency: 'KWD'})}
            </Typography>
          </div>
        </div>

      </Popover>
    </div>
  )
}

export default connect(
  state => ({
    cart: state.cart
  })
)(withStateHandlers(
  {
    cartMenuOpen: false,
  },
  {
    handleCartMenuToggle: ({ cartMenuOpen }) => () => ({
      cartMenuOpen: !cartMenuOpen
    }),
    handleCartMenuClose: () => () => ({ cartMenuOpen: false })
  }
)(withStyles(styles)(Cart)));
