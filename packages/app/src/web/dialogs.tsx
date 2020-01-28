import React from 'react';
import { closeDialogAction, DialogType } from '../features/ui/actions';
import { useSelector } from 'react-redux';
import Dialog from '@material-ui/core/Dialog';
import { ServicesScreen, CartScreen } from './screens';
import { BillPage } from './screens/bill';
import { RootState } from 'typesafe-actions';
import { useAction } from '@dinify/common/src/lib/util';
import { ClearOrderDialog } from './components/dialogs/clear-order';
import { useCartRestaurant } from '../features/cart/selectors';
import { makeCartDoneAsync } from '../features/cart/actions';

export default () => {
  const userId = useSelector<RootState, string>(state => state.firebase.auth.uid);
  const closeDialog = useAction(closeDialogAction);
  const dialogs = useSelector((state: RootState) => state.ui.dialogs);

  const restaurantId = useCartRestaurant();
  const clearOrderAction = useAction(makeCartDoneAsync.request);

  const getHandler = (id: DialogType) => () => {
    closeDialog(id);
  };
  const clearOrderHandler = (confirmed: boolean) => {
    if (confirmed) {
      // dispatch clear cart action
      closeDialog('clear-order');
      if (restaurantId && userId) clearOrderAction({ restaurantId, userId });
    }
    else {
      closeDialog('clear-order');
    }
  };

  let clearOrderProps = {};
  if (dialogs['clear-order'] && (dialogs['clear-order'] as any).props) {
    clearOrderProps = (dialogs['clear-order'] as any).props;
  }

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
      <ClearOrderDialog open={!!dialogs['clear-order']} onClose={() => clearOrderHandler(false)} onConfirm={clearOrderHandler} {...clearOrderProps} />
    </>
  );
};
