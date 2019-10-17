import React from 'react';
import { useStore } from 'react-redux';
import { RootState } from 'typesafe-actions';
import LanguagePickerDialog from '@dinify/common/src/components/dialogs/LanguagePickerDialog';
import CurrencyPickerDialog from '@dinify/common/src/components/dialogs/CurrencyPickerDialog';
import { closeDialogAction, Dialog, DialogType } from '../../../ducks/ui/actions';

export default () => {
  const store = useStore();
  const state: RootState = store.getState();
  const { dialogs, locale } = state.ui;

  const getHandler = (type: DialogType) => (...params: any[]) => {
    (dialogs['language'] as Dialog).handler(...params);
    store.dispatch(closeDialogAction(type));
  };

  return <>
    <CurrencyPickerDialog
      locale={locale}
      open={!!dialogs['currency']}
      onClose={getHandler('currency')}/>

    <LanguagePickerDialog
      locale={locale}
      open={!!dialogs['language']}
      initialSelectedLanguage={'en'}
      onClose={getHandler('language')}/>
  </>;
};