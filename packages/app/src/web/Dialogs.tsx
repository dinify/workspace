import React from 'react';
import { openDialog, closeDialog } from '../ducks/ui/actions';
import { connect } from 'react-redux';
import Dialog from '@material-ui/core/Dialog';
import { ServicesScreen } from './screens';
import { CartPage } from './components/cart';
import { BillPage } from './components/bill';

const Dialogs = (props: {
  dialogs: {[type: string]: boolean},
  closeDialog: (type: string) => void
}) => {
  const { dialogs, closeDialog } = props;
  return (<>
    <Dialog fullScreen open={!!dialogs['cart']}>
      <CartPage onClose={() => closeDialog('cart')}/>
    </Dialog>
    <Dialog fullScreen open={!!dialogs['bill']}>
      <BillPage onClose={() => closeDialog('bill')}/>
    </Dialog>
    <Dialog fullScreen open={!!dialogs['services']}>
      <ServicesScreen onClose={() => closeDialog('services')}/>
    </Dialog>
  </>);
}

export default connect(
  (state: any) => ({
    dialogs: state.ui.dialogs,
  }),
  {
    openDialog,
    closeDialog,
  }
)(Dialogs);
