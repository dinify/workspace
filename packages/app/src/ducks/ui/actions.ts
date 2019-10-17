import { createAction } from 'typesafe-actions';
import { Locale } from '@phensley/cldr';
import { localeMatcher } from '@dinify/common/src/lib/i18n';

const p = 'dinify/ui';

export type DialogType = 'cart'|'bill'|'services'|'language'|'currency';
export interface Dialog {
  type: DialogType,
  handler: (...params: any[]) => any
}

export const openDialogAction = createAction(
  `${p}/DIALOG_OPEN`,
  action => (dialog: DialogType|Dialog) => action(dialog)
);

export const closeDialogAction = createAction(
  `${p}/DIALOG_CLOSE`,
  action => (dialogType: DialogType) => action(dialogType)
);

export const toggleThemeAction = createAction(
  `${p}/TOGGLE_THEME`,
  action => () => action()
);

export const setLocaleAction = createAction(
  `${p}/SET_LOCALE`,
  action => (payload: Locale|string): { type: string, payload: Locale } => {
    let locale: Locale;
    if (typeof payload === 'string') locale = localeMatcher.match((payload as string)).locale;
    else locale = payload as Locale;

    console.log('action', locale);
    return action(locale);
  }
);
