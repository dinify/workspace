import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from 'typesafe-actions';
import LanguagePickerDialog from '@dinify/common/src/components/dialogs/LanguagePickerDialog';
import CurrencyPickerDialog from '@dinify/common/src/components/dialogs/CurrencyPickerDialog';
import {
  closeDialogAction,
  Dialog,
  DialogType,
} from '../../../../features/ui/actions';
import { useIntl } from '@dinify/common/src/lib/i18n';
import { useAction } from '@dinify/common/src/lib/util';
import LogoutDialog from './logout';

export default () => {
  const closeDialog = useAction(closeDialogAction);
  const { dialogs } = useSelector((state: RootState) => state.ui);
  const {
    state: { locale },
  } = useIntl();

  const getHandler = (type: DialogType) => (...params: any[]) => {
    if ((dialogs[type] as Dialog).handler)
      (dialogs[type] as Dialog).handler(...params);
    closeDialog(type);
  };

  return (
    <>
      <CurrencyPickerDialog
        open={!!dialogs['currency']}
        onClose={getHandler('currency')}
      />

      <LanguagePickerDialog
        open={!!dialogs['language']}
        initialSelectedLocale={locale}
        onClose={getHandler('language')}
      />

      <LogoutDialog open={!!dialogs['logout']} onClose={getHandler('logout')} />
    </>
  );
};
