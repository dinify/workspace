// @flow
import React from 'react';
import ReactDOM from 'react-dom';
import { withStateHandlers } from 'recompose';

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
  setCartAnchor,
  cartMenuOpen,
  handleCartMenuToggle,
  handleCartMenuClose,
  cartAnchor,
  anchor
}) => {
  return (
    <div ref={node => { setCartAnchor(ReactDOM.findDOMNode(node)) }}>
      <IconButton
        onClick={handleCartMenuToggle}
        style={{marginRight: 16}}
        className={classes.margin}>
        <Badge badgeContent={4} color="primary">
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

        <ListItem>
          <ListItemAvatar>
            <Avatar>
              <ShoppingCart className={classes.secondary}/>
            </Avatar>
          </ListItemAvatar>
          <ListItemText
            primary="Cabbage kimchi"
            secondary="12.000 KD"
            primaryTypographyProps={{variant: 'body1'}}
            secondaryTypographyProps={{variant: 'caption'}}/>
        </ListItem>

      </Popover>
    </div>
  )
}

export default withStateHandlers(
  {
    cartMenuOpen: false,
    cartAnchor: null
  },
  {
    setCartAnchor: () => (node) => ({cartAnchor: node}),
    handleCartMenuToggle: ({ cartMenuOpen }) => () => ({
      cartMenuOpen: !cartMenuOpen
    }),
    handleCartMenuClose: () => () => ({ cartMenuOpen: false })
  }
)(Cart);
