import assoc from 'ramda/es/assoc';
import assocPath from 'ramda/es/assocPath';
import * as wsActions from '../socket/actions';
import { AnyAction } from 'redux';
import { getType } from 'typesafe-actions';
import * as actions from './actions';
import { Dialog, Snackbar } from './actions';
import dissocPath from 'ramda/es/dissocPath';

export type ThemeType = 'light'|'dark';
export interface UiState {
  progressMap: any,
  errorsMap: { [key: string]: ErrorMessage },
  dialogs: { [key: string]: boolean|Dialog },
  snackbars: { [key: string]: Snackbar },
  transactionStatus: any,
  bottomBarOpen: boolean,
  theme: ThemeType
};
export interface ErrorMessage {
  message: string,
  code: string
}

const initialState: UiState = {
  progressMap: {},
  errorsMap: {},
  dialogs: {},
  snackbars: {},
  transactionStatus: null,
  bottomBarOpen: false,
  theme: 'light'
};


export default function reducer(state: UiState = initialState, action: AnyAction): UiState {
  if (action.type.includes('_FAIL')) {
    const theMessage = action.payload;
    const theCode = action.payload;
    if (theMessage) {
      state = assocPath<ErrorMessage, UiState>(['errorsMap', action.type], {
        message: theMessage,
        code: theCode,
      })(state);
    }
  }
  switch (action.type) {
    case 'dinify/transaction/INIT_TRANSACTION_DONE': {
      return assocPath<any, UiState>(['transactionStatus'], action.payload.status)(state);
    }

    case 'dinify/transaction/GET_BILL_DONE':
    case 'dinify/cart/GET_CART_DONE': {
      // TODO: IF the bill item count or cart item count > 0
      return assoc('bottomBarOpen', action.payload.orderItemCount > 0)(state);
    }

    case getType(wsActions.confirmedPaymentAction): {
      return assocPath<any, UiState>(['transactionStatus'], action.payload.transaction.status)(state);
    }

    case getType(actions.openDialogAction): {
      let path = action.payload;
      let value: boolean|Dialog = true;
      if (typeof action.payload === 'object') {
        const payload = action.payload as Dialog;
        path = payload.type;
        value = payload;
      }
      return assocPath<boolean|Dialog, UiState>(['dialogs', path], value)(state);
    }
    case getType(actions.closeDialogAction): {
      let path = action.payload;
      return dissocPath<UiState>(['dialogs', path])(state);
    }
    case getType(actions.showSnackbarAction): {
      let snackbar = action.payload as Snackbar;
      const id = snackbar.id || Math.random().toString(36).substring(7);
      const value = { ...snackbar, id, visible: true };
      return assocPath<Snackbar, UiState>(['snackbars', id], value)(state);
    }
    case getType(actions.hideSnackbarAction): {
      return assocPath<boolean, UiState>(['snackbars', action.payload, 'visible'], false)(state);
    }
    case getType(actions.toggleThemeAction): {
      return assoc('theme', state.theme === 'dark' ? 'light' : 'dark')(state);
    }
    case 'persist/REHYDRATE': {
      return assoc('errorsMap', {})(assoc('progressMap', {})(state));
    }
    default:
      return state;
  }
}
