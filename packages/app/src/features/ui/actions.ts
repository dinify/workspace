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

export const showSnackbarAction = createAction(`${p}/SNACKBAR_SHOW`)<
  Snackbar
>();

export const hideSnackbarAction = createAction(`${p}/SNACKBAR_HIDE`)<
  SnackbarId
>();

export const openDialogAction = createAction(`${p}/DIALOG_OPEN`)<
  DialogType | Dialog
>();

export const closeDialogAction = createAction(`${p}/DIALOG_CLOSE`)<
  DialogType
>();

export const toggleThemeAction = createAction(`${p}/TOGGLE_THEME`)();
