import React from 'react';
import { openDialogAction, closeDialogAction, DialogType } from '../features/ui/actions';
import { useSelector } from 'react-redux';
import Dialog from '@material-ui/core/Dialog';
import { ServicesScreen, CartScreen } from './screens';
import { BillPage } from './screens/bill';
import { RootState } from 'typesafe-actions';
import { useAction } from '@dinify/common/src/lib/util';
import { ClearOrderDialog } from './components/dialogs/clear-order';
import { useCartRestaurant } from '../features/cart/selectors';
import { Restaurant } from 'RestaurantModels';
import { useLocation } from 'react-router';

export default () => {
  const location = useLocation();
  const closeDialog = useAction(closeDialogAction);
  const openDialog = useAction(openDialogAction);
  const dialogs = useSelector((state: RootState) => state.ui.dialogs);

  const restaurantId = useCartRestaurant();
  const restaurant = useSelector<RootState, Restaurant>(state =>
    restaurantId ? state.restaurant.all[restaurantId] : null
  );
  
  const getHandler = (id: DialogType) => () => {
    if (id === 'cart') {
      closeDialog(id);
      let presentDialog = true;
      if (restaurant) {
        presentDialog = !location.pathname.includes(restaurant.subdomain);
      }
      if (presentDialog) openDialog('clear-order');
    }
    else closeDialog(id);
  };
  const clearOrderHandler = (confirmed: boolean) => {
    if (confirmed) {
      // set buttons to disabled
      // TODO: dispatch clear cart action
      // callback: closeDialog('clear-order');
    }
    else {
      closeDialog('clear-order');
    }
  };

  return (
    <>
      <Dialog fullScreen open={!!dialogs['cart']} onClose={getHandler('cart')}>
        <CartScreen onClose={getHandler('cart')} />
      </Dialog>
      <Dialog fullScreen open={!!dialogs['bill']} onClose={getHandler('bill')}>
        <BillPage onClose={getHandler('bill')} />
      </Dialog>
      <Dialog
        fullScreen
        open={!!dialogs['services']}
        onClose={getHandler('services')}
      >
        <ServicesScreen onClose={getHandler('services')} />
      </Dialog>
      <ClearOrderDialog open={!!dialogs['clear-order']} onClose={() => clearOrderHandler(false)} onConfirm={clearOrderHandler} />
    </>
  );
};
