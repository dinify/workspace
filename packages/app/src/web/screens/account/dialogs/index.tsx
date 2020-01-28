import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from 'typesafe-actions';
import CurrencyPickerDialog from '@dinify/common/src/components/dialogs/CurrencyPickerDialog';
import {
  closeDialogAction,
  Dialog,
  DialogType,
} from '../../../../features/ui/actions';
import { useAction } from '@dinify/common/src/lib/util';
import LogoutDialog from './logout';

export default () => {
  const closeDialog = useAction(closeDialogAction);
  const { dialogs } = useSelector((state: RootState) => state.ui);

  const getHandler = (type: DialogType) => (...params: any[]) => {
    if ((dialogs[type] as Dialog).handler && typeof (dialogs[type] as Dialog).handler === 'function')
      (dialogs[type] as any).handler(...params);
    closeDialog(type);
  };

  return (
    <>
      <CurrencyPickerDialog
        open={!!dialogs['currency']}
        onClose={getHandler('currency')}
      />

      <LogoutDialog open={!!dialogs['logout']} onClose={getHandler('logout')} />
    </>
  );
};
