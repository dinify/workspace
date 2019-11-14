import { createAction } from 'typesafe-actions';
import { TFunction } from '@dinify/common/src/lib/i18n/translations';

const p = 'dinify/ui';

export type DialogType =
  | 'cart'
  | 'bill'
  | 'services'
  | 'language'
  | 'currency'
  | 'logout';
export interface Dialog {
  type: DialogType;
  handler: (...params: any[]) => any;
}

export type TResolver = (t: TFunction) => string;
export type SnackbarType = 'test';
export type SnackbarId = SnackbarType | string;
export interface Snackbar {
  id?: SnackbarId;
  visible?: boolean;
  message: string | TResolver;
  handler?: (...params: any[]) => any;
  action?: string | TResolver;
}

export const showSnackbarAction = createAction(
  `${p}/SNACKBAR_SHOW`,
  action => (payload: Snackbar) => action(payload),
);

export const hideSnackbarAction = createAction(
  `${p}/SNACKBAR_HIDE`,
  action => (id: SnackbarId) => action(id),
);

export const openDialogAction = createAction(
  `${p}/DIALOG_OPEN`,
  action => (payload: DialogType | Dialog) => action(payload),
);

export const closeDialogAction = createAction(
  `${p}/DIALOG_CLOSE`,
  action => (type: DialogType) => action(type),
);

export const toggleThemeAction = createAction(
  `${p}/TOGGLE_THEME`,
  action => () => action(),
);
