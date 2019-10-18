import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from 'typesafe-actions';
import LanguagePickerDialog from '@dinify/common/src/components/dialogs/LanguagePickerDialog';
import CurrencyPickerDialog from '@dinify/common/src/components/dialogs/CurrencyPickerDialog';
import { closeDialogAction, Dialog, DialogType } from '../../../ducks/ui/actions';

export default () => {
  const dispatch = useDispatch();
  const { dialogs } = useSelector((state: RootState) => state.ui);

  const getHandler = (type: DialogType) => (...params: any[]) => {
    (dialogs[type] as Dialog).handler(...params);
    dispatch(closeDialogAction(type));
  };

  return <>
    <CurrencyPickerDialog
      open={!!dialogs['currency']}
      onClose={getHandler('currency')}/>

    <LanguagePickerDialog
      open={!!dialogs['language']}
      initialSelectedLanguage={'en'}
      onClose={getHandler('language')}/>
  </>;
};