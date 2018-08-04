// @flow
import React from 'react';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';
import { withStateHandlers } from 'recompose';

import Edit from 'icons/Edit';
import Done from 'icons/Done';
import RestaurantMenu from 'icons/RestaurantMenu';
import Divider from '@material-ui/core/Divider';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';

import SwipableItem from 'web/components/SwipableItem';
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
  editing,
  setEditing,
  order
}) => {
  const cartItemsList = FN.MapToList(cartItems);
  const iosInstalled = FN.isInstalled() && FN.getPlatform() === 'ios';

  return (
    <div style={{paddingBottom: 64}}>
      {!iosInstalled && <AppBar position="static"/>}
      {/* cartItemsList.map(item =>
        <div key={item.id} style={{paddingTop: 16}}>
          <SwipableItem
            actionColor="#c13939"
            actionIcon={<Delete/>}
            action={() => {}}>
            <CartItem padding rmFromCart={rmFromCart} editing={editing && false} item={item} />
          </SwipableItem>
        </div>
      ) */}
      <ResponsiveContainer>
        <div style={{display: 'flex', alignItems: 'center', paddingTop: 16}}>
          <div style={{flex: 1}}>
            <Typography variant="subheading">
              Cart
            </Typography>
            <Typography variant="caption">
              {`${cartItemsList.length > 0 ? cartItemsList.length : 'no'} item${cartItemsList.length !== 1 ? 's' : ''}`}
            </Typography>
          </div>

          <IconButton onClick={() => setEditing(!editing)}>
            {editing ? <Done /> : <Edit />}
          </IconButton>
        </div>
        {cartItemsList.map(item =>
          <div key={item.id} style={{paddingTop: 16}}>
            <CartItem rmFromCart={rmFromCart} editing={editing} item={item} />
          </div>
        )}
        <Divider style={{marginTop: 16, marginBottom: 16}}/>
        <div style={{display: 'flex', alignItems: 'center', paddingLeft: 72}}>
          <Typography style={{flex: 1}} variant="button">
            Total
          </Typography>

          <Typography variant="subheading">
            {FN.formatPrice(subtotal)}
          </Typography>
        </div>
        {cartItemsList.length > 0 &&
          <Button style={{marginTop: 16}} variant="extendedFab" color="primary" fullWidth onClick={() => order()}>
            <RestaurantMenu style={{marginRight: 16}} />
            Order
          </Button>
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
)(withStateHandlers(
  {
    editing: false,
  },
  {
    setEditing: () => (editing) => ({editing}),
  }
)(withStyles(styles)(Cart)));
