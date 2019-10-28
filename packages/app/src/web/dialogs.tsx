import React from 'react';
import { closeDialogAction, DialogType } from '../ducks/ui/actions';
import { useSelector, useDispatch } from 'react-redux';
import Dialog from '@material-ui/core/Dialog';
import { ServicesScreen } from './screens';
import { CartPage } from './components/cart';
import { BillPage } from './components/bill';
import { RootState } from 'typesafe-actions';

export default () => {
  const dispatch = useDispatch();
  const dialogs = useSelector((state: RootState) => state.ui.dialogs);
  const getHandler = (id: DialogType) => () => dispatch(closeDialogAction(id));
  
  return (<>
    <Dialog fullScreen open={!!dialogs['cart']} onClose={getHandler('cart')}>
      <CartPage onClose={getHandler('cart')}/>
    </Dialog>
    <Dialog fullScreen open={!!dialogs['bill']} onClose={getHandler('bill')}>
      <BillPage onClose={getHandler('bill')}/>
    </Dialog>
    <Dialog fullScreen open={!!dialogs['services']} onClose={getHandler('services')}>
      <ServicesScreen onClose={getHandler('services')}/>
    </Dialog>
  </>);
}