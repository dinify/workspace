import React from 'react';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';
import { withStateHandlers } from 'recompose';
import { useTranslation } from '@dinify/common/src/lib/i18n';

import Delete from '@material-ui/icons/DeleteRounded';
import Done from '@material-ui/icons/DoneRounded';
import RestaurantMenu from '@material-ui/icons/RestaurantMenuRounded';
import Divider from '@material-ui/core/Divider';
import Fab from '@material-ui/core/Fab';
import IconButton from '@material-ui/core/IconButton';

// import SwipableItem from 'web/components/SwipableItem';
import ResponsiveContainer from '@dinify/common/dist/components/ResponsiveContainer';
import Typography from '@material-ui/core/Typography';
import CartItem from 'web/components/CartItem';
import Price from 'web/components/Price';
import TotalPrice from 'web/components/TotalPrice';
// import Radio from '@material-ui/core/Radio';
// import RadioGroup from '@material-ui/core/RadioGroup';
// import FormControlLabel from '@material-ui/core/FormControlLabel';

import * as FN from '@dinify/common/dist/lib/FN';
import { rmFromCartAsync, orderAsync } from 'ducks/cart/actions.ts';

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
  cart,
  rmFromCart,
  editing,
  setEditing,
  checkedin,
  order,
}) => {
  const { t } = useTranslation();
  const notCheckedIn = !checkedin; // !checkedInRestaurant;

  if (!cart) return null;
  const count = cart.count === undefined ? 0 : cart.count;
  return (
    <div style={{paddingBottom: 64}}>
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
            <Typography variant="subtitle1">
              {t('cart.title')}
            </Typography>
            <Typography variant="caption">
              {t('cart.itemCount', { count, context: count === 0 ? 'none' : undefined })}
            </Typography>
          </div>

          <IconButton disabled={cart.count === 0} onClick={() => setEditing(!editing)}>
            {editing ? <Done /> : <Delete />}
          </IconButton>
        </div>
        {cart && FN.MapToList(cart.restaurants).map(restaurant =>
          FN.MapToList(restaurant.items).map(item =>
            <div key={item.id} style={{marginTop: 16}}>
              <CartItem rmFromCart={rmFromCart} editing={editing} item={item} />
            </div>
          )
        )}
        <Divider style={{marginTop: 16, marginBottom: 16}}/>
        {notCheckedIn && false && <div>
          {/* <Typography variant="overline" color="textSecondary">
            Order type
          </Typography>
          <RadioGroup
            aria-label="Order type"
            value={orderType}
            onChange={(ev) => setOrderType({ orderType: ev.target.value })}
          >
            <FormControlLabel value="TAKEAWAY" control={<Radio />} label="Takeaway" />
            <FormControlLabel value="AHEAD" control={<Radio />} label="Order ahead" />
            <FormControlLabel value="DELIVERY" disabled control={<Radio />} label="Delivery (coming soon!)" />
          </RadioGroup> */}
          <div style={{display: 'flex', alignItems: 'center'}}>
            <Typography style={{flex: 1}} variant="caption">
              {t('subtotal')}
            </Typography>

            <Typography variant="overline">
              <Price price={cart.subtotal} />
            </Typography>
          </div>
          <div style={{display: 'flex', alignItems: 'center'}}>
            <Typography style={{flex: 1}} variant="caption">
              {t('serviceFee')}
            </Typography>

            <Typography variant="overline">

            </Typography>
          </div>
        </div>}
        {cart.count > 0 && (
          <div style={{paddingLeft: notCheckedIn ? 0 : 72}}>
            <TotalPrice price={cart.subtotal} />
          </div>
        )}
        <Fab
          disabled={notCheckedIn || cart.count === 0 || cart === null }
          style={{marginTop: 16, width: '100%'}}
          variant="extended"
          color="primary"
          onClick={() => order()}>
          <RestaurantMenu style={{marginRight: 16}} />
          {t('order')}
        </Fab>
      </ResponsiveContainer>
    </div>
  )
}

export default connect(
  (state) => ({
    cart: null,
    checkedin: state.seat.checkedin,
    checkedInRestaurant: state.restaurant.checkedInRestaurant
  }),
  {
    rmFromCart: rmFromCartAsync.request,
    order: orderAsync.request
  }
)(withStateHandlers(
  {
    editing: false,
  },
  {
    setEditing: () => (editing) => ({ editing }),
  }
)(withStyles(styles)(Cart)));
