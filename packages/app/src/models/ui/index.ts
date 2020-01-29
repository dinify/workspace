import { createModel } from '@rematch/core';
import assocPath from 'ramda/es/assocPath';
import { TFunction } from '@dinify/common/src/lib/i18n/translations';
import { getActionsFromModel } from '../_util';

const initialState = {
  snackbars: {},
}

export type UIState = typeof initialState;

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

const UImodel = createModel({
  state: initialState,
  reducers: {
    showSnackbar: (state: UIState, payload: any): any => {
      let snackbar = payload as Snackbar;
      const id = snackbar.id || Math.random().toString(36).substring(7);
      const value = { ...snackbar, id, visible: true };
      return assocPath<Snackbar, UIState>(['snackbars', id], value)(state);
    }

  },
});

export default UImodel;

// temporary solution to make model working with epics safely
export const actions = getActionsFromModel('_ui', UImodel);
