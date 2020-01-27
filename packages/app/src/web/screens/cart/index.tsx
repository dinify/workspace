import React, { useState } from 'react';
import {
  useIntl,
  useTranslation,
  localizedLanguages,
} from '@dinify/common/src/lib/i18n';
import { animated, useSpring } from 'react-spring';
import { useSelector } from 'react-redux';
import Fab from '@material-ui/core/Fab';
import QRCode from 'qrcode.react';
import { AppBar, AppBarAction, AppBarTitle } from '../../components/app-bar';
import { RootState } from 'typesafe-actions';

import { Subtotal } from 'CartModels';
import { Restaurant } from 'RestaurantModels';

import { orderAsync } from '../../../features/cart/actions';
import { getOrderItemIds, useCartRestaurant } from '../../../features/cart/selectors';
import RestaurantMenu from '@material-ui/icons/RestaurantMenuRounded';
// import MoreVert from '@material-ui/icons/MoreVert';

// import Add from '@material-ui/icons/AddRounded';
import Delete from '@material-ui/icons/DeleteRounded';
import { Button, Divider } from '@material-ui/core';
import { Typography } from '../../components/typography'
import { useAction } from '@dinify/common/src/lib/util';
import Price from '@dinify/common/src/components/price';
import { OrderItem } from '../../components/order-item';
import Switch from '@material-ui/core/Switch';
import { Profile } from '../../../store/root-reducer';
import toPairs from 'ramda/es/toPairs';
import { openDialogAction } from '../../../features/ui/actions';

export const CartScreen: React.FC<{
  onClose?: () => void;
}> = ({
  onClose = () => { },
  ...otherProps
}) => {
  const { t } = useTranslation();
  const { state, setLocale } = useIntl();
  const profile = useSelector((state: RootState) => state.firebase.profile);
  const isLanguageSet = profile ? !!profile.language : false;
  const language = profile.language as Profile['language'];
  
  const [editMode, setEditMode] = useState(false);
  const [selectedItems, setSelectedItems] = useState<{[key: string]: boolean}>({});
  const selectedItemCount = toPairs(selectedItems).filter(([k,v]) => v).length;
  const handleItemClick = (itemId: string) => {
    // TODO: open menu item customizations instead
    if (!editMode) setEditMode(true);
    selectItem(itemId);
  };
  const selectItem = (itemId: string) => {
    const org = selectedItems[itemId] || false;
    setSelectedItems({...selectedItems, [itemId]: !org});
  };
  const animatedStyle = useSpring({
    transform: `translate3d(0, ${editMode ? 8 : 0}px, 0)`,
    opacity: editMode ? 0 : 1,
    config: { tension: 400 }
  });
  const toggleDefaultLanguage = () => {
    if (isLanguageSet && !useDefaultLanguage) {
      setLocale(language.primary);
    }
    else {
      if (restaurant && restaurant.menuLanguages) {
        const menuLanguage = restaurant.menuLanguages.find(m => m.default);
        if (menuLanguage) setLocale(menuLanguage.language);
      }
      else {
        // TODO: fetch restaurant if not available in state
      }
    }
    setUseDefaultLanguage(!useDefaultLanguage);
  };
  const [useDefaultLanguage, setUseDefaultLanguage] = useState(true);

  const checkedInRestaurant = useSelector<RootState, any>(state => state.restaurant.checkedInRestaurant);
  const orderItemIds = useSelector<RootState, string[]>(state => getOrderItemIds(state.cart));
  const subtotal = useSelector<RootState, Subtotal>(state => state.cart.subtotal);
  const user = useSelector<RootState, any>(state => state.firebase.auth);
  const restaurantIdOfCart = useCartRestaurant();
  const restaurant = useSelector<RootState, Restaurant>(state =>
    state.restaurant.all[checkedInRestaurant] || null
  );
  const getLocalName = (language: string) => {
    return (localizedLanguages as any)[language];
  };

  const order = useAction(orderAsync.request);
  const openDialog = useAction(openDialogAction);

  const cartItemCount = orderItemIds.length;
  const canOrder = cartItemCount > 0 && checkedInRestaurant !== null;

  const domain = process.env.REACT_APP_DOMAIN || 'web.dinify.app';
  const orderUrl = `https://${domain}/order/${user.uid}/${restaurantIdOfCart}`;
  let title = t('cart.title');
  let subtitle = t('itemCount', [cartItemCount]);
  if (editMode) {
    title = 'Editing';
    subtitle = t('itemCountSelected', [selectedItemCount])
  }
  return (
    <div {...otherProps}>
      <AppBar style={{ position: 'fixed', top: 0, left: 0, right: 0 }}>
        {!editMode && <AppBarAction type="close" onClick={onClose} />}
        <AppBarTitle
          title={title}
          subtitle={subtitle}
        />
        {editMode && <AppBarAction
          type={'done'}
          onClick={() => {
            setSelectedItems({});
            setEditMode(false);
          }}
        />}
        {/*!editMode && <IconButton
          aria-label="More"
          aria-owns={open ? 'long-menu' : undefined}
          aria-haspopup="true"
          onClick={(evt) => {}}
        >
          <MoreVert />
        </IconButton>*/}

        <div>
          <Typography variant="caption" color="textSecondary">
            {t('language.default')}
          </Typography>
          <Typography variant="caption">
            {getLocalName(state.locale.tag.language())}
          </Typography>
        </div>
        <Switch color="primary" checked={useDefaultLanguage} onChange={toggleDefaultLanguage} />

      </AppBar>
      <div style={{ marginTop: 56 }}>
        {orderItemIds.map(itemId => (
          <OrderItem
            style={{ padding: '8px 16px' }}
            onClick={() => handleItemClick(itemId)}
            selected={selectedItems[itemId] || false}
            key={itemId}
            id={itemId}
          />
        ))}
      </div>
      <div style={{ padding: '0 16px' }}>
        
        <div style={{ marginTop: 8, display: 'flex', alignItems: 'center' }}>
          <Typography style={{ flex: 1 }} variant="subtitle1">
            {t('total')}
          </Typography>
          <Typography variant="subtitle1">
            <Price original price={subtotal} />
          </Typography>
        </div>
        <div
        style={{  margin: '16px 0', minWidth: '100%', display: 'flex', alignItems: 'top', justifyContent: "flex-end" }} >
          <Button onClick={() => openDialog('clear-order')} style={{marginRight: 8, marginLeft: 8}} variant="text" color="primary">
            Clear order
          </Button>
          {editMode && <Button variant="outlined" color="primary">
            Delete
            <Delete style={{ marginLeft: 8 }}/>
          </Button>}
          {/*!editMode && <Button variant="outlined" color="primary">
            Add
            <Add style={{ marginLeft: 8 }}/>
        </Button>*/}
        </div>
      </div>
      <Divider />
      <animated.div style={{ padding: '0 16px', marginTop: 56, ...animatedStyle }}>
        {restaurant && restaurant.settings.orders ?
        <>
          <Fab
            disabled={!canOrder}
            style={{ marginTop: 16, width: '100%' }}
            variant="extended"
            color="primary"
            onClick={() => order({})}
          >
            <RestaurantMenu style={{ marginRight: 16 }} />
            {t('order.title')}
          </Fab>
          {!canOrder && <Typography style={{ marginTop: 8 }} variant="caption" color="textSecondary">
            {t('order.instruction')}
          </Typography>}
        </>
        :
        <div style={{textAlign: 'center'}}>
          <Typography style={{ margin: '32px 0 8px 0' }} variant="caption" color="textSecondary">
            To make an order show this code to the waiter
          </Typography>
          <QRCode value={orderUrl} />
        </div>
        }
        
      </animated.div>
    </div>
  );
};
