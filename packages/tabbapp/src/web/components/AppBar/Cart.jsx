// @flow
import React from 'react';
import { withStateHandlers } from 'recompose';
import { connect } from 'react-redux';

import ShoppingCart from 'icons/ShoppingCart';

import Popover from '@material-ui/core/Popover';
import Badge from '@material-ui/core/Badge';
import IconButton from '@material-ui/core/IconButton';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemText from '@material-ui/core/ListItemText';
import Avatar from '@material-ui/core/Avatar';

const Cart = ({
  classes,
  cartMenuOpen,
  handleCartMenuToggle,
  handleCartMenuClose,
  anchor,
  cartItems
}) => {
  return (
    <div>
      <IconButton
        onClick={handleCartMenuToggle}
        style={{marginRight: 16}}
        className={classes.margin}>
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
          horizontal: 'right',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}>
          {cartItems.map((item) =>
            <ListItem>
              <ListItemAvatar>
                <Avatar>
                  <ShoppingCart className={classes.secondary}/>
                </Avatar>
              </ListItemAvatar>
              <ListItemText
                primary={item.name}
                secondary={item.price}
                primaryTypographyProps={{variant: 'body1'}}
                secondaryTypographyProps={{variant: 'caption'}}/>
            </ListItem>
          )}
      </Popover>
    </div>
  )
}

export default connect(
  state => ({
    cartItems: state.cart.items
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
)(Cart));
