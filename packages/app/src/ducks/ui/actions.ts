import { createAction } from 'typesafe-actions';

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
