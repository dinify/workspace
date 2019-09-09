import * as actions from './actions';
import { createReducer } from 'typesafe-actions';
import { combineReducers } from 'redux';
import { Subtotal } from 'CartModels';
import { OrderNMap } from 'TransactionModels';

export const orders = createReducer({} as OrderNMap)

  .handleAction(actions.fetchBillAsync.failure, () => {
    return {};
  })

  .handleAction(actions.fetchBillAsync.success, (state, action) => {
    return action.payload.entities.orders;
  });

export const orderItemsCount = createReducer(0 as number)

  .handleAction(actions.fetchBillAsync.failure, () => {
    return 0;
  })

  .handleAction(actions.fetchBillAsync.success, (state, action) => {
    return action.payload.result.count;
  });

const defaultSubtotal: Subtotal = {
  amount: 0,
  currency: 'CZK',
  precision: 2
}

export const subtotal = createReducer(defaultSubtotal as Subtotal)

  .handleAction(actions.fetchBillAsync.failure, () => {
    return defaultSubtotal;
  })

  .handleAction(actions.fetchBillAsync.success, (state, action) => {
    return action.payload.result.subtotal;
  });


const transactionReducer = combineReducers({
  orders,
  orderItemsCount,
  subtotal,
  // receipt: {},
  // gratitude: 10
});

export default transactionReducer;
export type TransactionState = ReturnType<typeof transactionReducer>;

// const p = 'dinify/transaction';

// export default function reducer(state = initialState, action) {
//   const { payload, type } = action;
//   switch (type) {
//     case 'persist/REHYDRATE': {
//       if (!payload || !payload.bill) return state;
//       return pipe(
//         assoc('bill', {}),
//         assoc('lastBill', payload.bill.lastBill)
//       )(state);
//     }
//     case `${p}/FETCH_BILL_DONE`: {
//       const bill = payload.res;
//       return pipe(
//         (state) => Object.keys(bill).length > 0 ? assoc('lastBill', bill)(state) : state,
//         assoc('bill', bill)
//       )(state);
//     }
//     case `${p}/FETCH_RECEIPT_DONE`: {
//       const receipt = payload.res;
//       return assoc('receipt', receipt)(state);
//     }
//     case `${p}/SET_GRATITUDE`: {
//       const { percentage } = payload;
//       return assoc('gratitude', percentage)(state);
//     }
//     default:
//       return state;
//   }
// }