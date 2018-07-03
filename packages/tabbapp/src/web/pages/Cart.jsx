// @flow
import React from 'react';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';

import Divider from '@material-ui/core/Divider';
import Button from '@material-ui/core/Button';

import AppBar from 'web/components/AppBar';
import ResponsiveContainer from 'web/components/ResponsiveContainer';
import Typography from 'web/components/Typography';
import CartItem from 'web/components/CartItem';

import * as FN from 'lib/FN';
import { rmFromCartInit, orderInit } from 'ducks/cart/actions';

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
  cartItems,
  subtotal,
  rmFromCart,
  order
}) => {
  const cartItemsList = FN.MapToList(cartItems);
  const iosInstalled = FN.isInstalled() && FN.getPlatform() === 'ios';

  return (
    <div style={{paddingBottom: 64}}>
      {!iosInstalled && <AppBar position="static"/>}
      <ResponsiveContainer >
        <div style={{padding: 8}}>
          {cartItemsList.map(item =>
            <CartItem key={item.id} item={item} rmFromCart={rmFromCart} />
          )}
        </div>
        <Divider />
        <div style={{display: 'flex', alignItems: 'center', padding: 16}}>
          <Typography style={{flex: 1}} variant="button">
            Total
          </Typography>

          <Typography variant="subheading">
            {FN.formatPrice(subtotal)}
          </Typography>
        </div>
        {cartItemsList.length > 0 &&
          <Button variant="contained" color="primary" fullWidth onClick={() => order()}>Order</Button>
        }
      </ResponsiveContainer>
    </div>
  )
}

export default connect(
  state => ({
    cartItems: state.cart.items,
    subtotal: state.cart.subtotal
  }),
  {
    rmFromCart: rmFromCartInit,
    order: orderInit
  }
)(withStyles(styles)(Cart));
