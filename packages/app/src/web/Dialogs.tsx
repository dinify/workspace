import React from 'react';
import { closeDialogAction, DialogType } from '../ducks/ui/actions';
import { useStore } from 'react-redux';
import Dialog from '@material-ui/core/Dialog';
import { ServicesScreen } from './screens';
import { CartPage } from './components/cart';
import { BillPage } from './components/bill';
import { RootState } from 'typesafe-actions';

export default () => {
  const store = useStore();
  const getHandler = (id: DialogType) => () => store.dispatch(closeDialogAction(id));
  const state: RootState = store.getState();
  const { dialogs } = state.ui;
  
  return (<>
    <Dialog fullScreen open={!!dialogs['cart']} onClose={getHandler('cart')}>
      <CartPage onClose={getHandler('cart')}/>
    </Dialog>
    <Dialog fullScreen open={!!dialogs['bill']} onClose={getHandler('cart')}>
      <BillPage onClose={getHandler('bill')}/>
    </Dialog>
    <Dialog fullScreen open={!!dialogs['services']} onClose={getHandler('cart')}>
      <ServicesScreen onClose={getHandler('services')}/>
    </Dialog>
  </>);
}
