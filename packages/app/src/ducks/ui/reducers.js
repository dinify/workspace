import assoc from 'ramda/es/assoc';
import assocPath from 'ramda/es/assocPath';
import * as types from './types';
import wsTypes from '../../websockets/types';

const initialState = {
  progressMap: {},
  errorsMap: {},
  dialogs: {},
  transactionStatus: null,
  bottomBarOpen: false,
  theme: 'light'
};


export default function reducer(state = initialState, action) {
  if (action.type.includes('_FAIL')) {
    const theMessage = action.payload;
    const theCode = action.payload;
    if (theMessage) {
      state = assocPath(['errorsMap', action.type], {
        message: theMessage,
        code: theCode,
      })(state);
    }
  }
  switch (action.type) {
    case 'dinify/transaction/INIT_TRANSACTION_DONE': {
      return assocPath(['transactionStatus'], action.payload.status)(state);
    }

    case 'dinify/transaction/GET_BILL_DONE':
    case 'dinify/cart/GET_CART_DONE': {
      // TODO: IF the bill item count or cart item count > 0
      return assoc('bottomBarOpen', action.payload.orderItemCount > 0)(state);
    }

    case wsTypes.CONFIRMED_PAYMENT: {
      return assocPath(['transactionStatus'], action.payload.transaction.status)(state);
    }

    case types.DIALOG_OPEN: {
      return assoc('dialogs', { [action.payload]: true })(state);
    }
    case types.DIALOG_CLOSE: {
      return assoc('dialogs', {})(state);
    }
    case types.TOGGLE_THEME: {
      return assoc('theme', state.theme === 'dark' ? 'light' : 'dark')(state);
    }
    case 'persist/REHYDRATE': {
      return assoc('errorsMap', {})(assoc('progressMap', {})(state));
    }
    default:
      return state;
  }
}
