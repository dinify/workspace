import { createAction } from 'typesafe-actions';
import { Locale } from '@phensley/cldr';

const p = 'dinify/ui';

export const openDialogAction = createAction(
  `${p}/DIALOG_OPEN`,
  action => (payload: any) => action(payload)
);

export const closeDialogAction = createAction(
  `${p}/DIALOG_CLOSE`,
  action => (dialogId: string) => action(dialogId)
);

export const toggleThemeAction = createAction(
  `${p}/TOGGLE_THEME`,
  action => () => action()
);

export const setLocaleAction = createAction(
  `${p}/SET_LOCALE`,
  action => (payload: Locale) => action(payload)
);
