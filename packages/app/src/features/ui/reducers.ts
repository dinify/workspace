import assoc from 'ramda/es/assoc';
import assocPath from 'ramda/es/assocPath';
import * as wsActions from '../socket/actions';
import { AnyAction } from 'redux';
import { getType } from 'typesafe-actions';
import * as actions from './actions';
import { Dialog } from './actions';
import dissocPath from 'ramda/es/dissocPath';
import { makeCartDoneAsync } from '../cart/actions';

export type ThemeType = 'light'|'dark';
export interface UiState {
  dialogs: { [key: string]: boolean|Dialog },
  transactionStatus: any,
  bottomBarOpen: boolean,
  theme: ThemeType
};
export interface ErrorMessage {
  message: string,
  code: string
}

const initialState: UiState = {
  dialogs: {},
  transactionStatus: null,
  bottomBarOpen: false,
  theme: 'light'
};

export default function reducer(state: UiState = initialState, action: AnyAction): UiState {

  switch (action.type) {
    case 'dinify/transaction/INIT_TRANSACTION_DONE': {
      return assocPath<any, UiState>(['transactionStatus'], action.payload.status)(state);
    }
    case getType(wsActions.confirmedPaymentAction): {
      return assocPath<any, UiState>(['transactionStatus'], action.payload.transaction.status)(state);
    }

    case 'dinify/transaction/GET_BILL_DONE':
    case 'dinify/cart/GET_CART_DONE': {
      // TODO: IF the bill item count or cart item count > 0
      return assoc('bottomBarOpen', action.payload.orderItemCount > 0)(state);
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
    case getType(makeCartDoneAsync.success): {
      return dissocPath<UiState>(['dialogs', 'cart'])(state);
    }

    case getType(actions.toggleThemeAction): {
      return assoc('theme', state.theme === 'dark' ? 'light' : 'dark')(state);
    }


    default:
      return state;
  }
}
