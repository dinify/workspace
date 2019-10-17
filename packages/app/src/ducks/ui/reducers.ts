import assoc from 'ramda/es/assoc';
import assocPath from 'ramda/es/assocPath';
import wsTypes from '../../websockets/types';
import { getDetectedLocale } from '@dinify/common/src/lib/i18n';
import { AnyAction } from 'redux';
import { Locale } from '@phensley/cldr';
import { getType } from 'typesafe-actions';
import * as actions from './actions';
import { getCookie } from '@dinify/common/src/lib/FN';
import { localeMatcher } from '@dinify/common/src/lib/i18n';
import { Dialog } from './actions';

export type ThemeType = 'light'|'dark';
export interface UiState {
  progressMap: any,
  errorsMap: { [key: string]: ErrorMessage },
  dialogs: { [key: string]: boolean|Dialog },
  transactionStatus: any,
  bottomBarOpen: boolean,
  theme: ThemeType,
  locale: Locale
};
export interface ErrorMessage {
  message: string,
  code: string
}

let locale = getDetectedLocale().locale;
const langCookie = getCookie('language');
if (langCookie) {
  try {
    const content = JSON.parse(langCookie);
    locale = localeMatcher.match(content.primary).locale;
  } catch (e) {
    console.error('JSON parse error');
  }
}

const initialState: UiState = {
  progressMap: {},
  errorsMap: {},
  dialogs: {},
  transactionStatus: null,
  bottomBarOpen: false,
  theme: 'light',
  locale
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
    
    case getType(actions.setLocaleAction): {
      console.log('reducer', action.payload);
      return assoc('locale', action.payload)(state);
    }

    case wsTypes.CONFIRMED_PAYMENT: {
      return assocPath<any, UiState>(['transactionStatus'], action.payload.transaction.status)(state);
    }

    case getType(actions.openDialogAction): {
      let path;
      let value = true;
      if (typeof action.payload === 'string') path = action.payload;
      else {
        path = action.payload.type;
        value = action.payload;
      }
      return assocPath<boolean, UiState>(['dialogs', path], value)(state);
    }
    case getType(actions.closeDialogAction): {
      return assoc('dialogs', {})(state);
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
