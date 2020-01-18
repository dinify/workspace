import React from 'react';
import { openDialogAction, closeDialogAction, DialogType } from '../features/ui/actions';
import { useSelector } from 'react-redux';
import Dialog from '@material-ui/core/Dialog';
import { ServicesScreen, CartScreen } from './screens';
import { BillPage } from './screens/bill';
import { RootState } from 'typesafe-actions';
import { useAction } from '@dinify/common/src/lib/util';
import { ClearOrderDialog } from './components/dialogs/clear-order';

export default () => {
  const closeDialog = useAction(closeDialogAction);
  const openDialog = useAction(openDialogAction);
  const dialogs = useSelector((state: RootState) => state.ui.dialogs);
  const getHandler = (id: DialogType) => () => {
    if (id === 'cart') {
      // console.log('handler');
      // closeDialog(id);
      openDialog('clear-order');
    }
    else closeDialog(id);
  };
  const clearOrderHandler = (confirmed: boolean) => {
    if (confirmed) {
      closeDialog('cart');
      closeDialog('clear-order');
      // TODO: dispatch clear cart action
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
