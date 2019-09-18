import * as actions from './actions';
// import * as wsActions from '../../websockets/actions';
import { createReducer } from 'typesafe-actions';
import { combineReducers } from 'redux';
import { Subtotal, OrderItemNMap, OrderItemN } from 'CartModels';
import { OrderNMap } from 'TransactionModels';
import mapObjIndexed from 'ramda/es/mapObjIndexed';

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

const identity = (o: any) => !!o && o !== 'pivotUndefined';

export const items = createReducer({} as OrderItemNMap)
    .handleAction(actions.fetchBillAsync.success, (state, action) => {
      const orderItems: OrderItemNMap = mapObjIndexed((orderItem: OrderItemN) => {
        
        const { orderAddons, orderExcludes, orderChoices } = orderItem;
        return {
          ...orderItem,
          orderAddons: orderAddons.filter(identity),
          orderExcludes: orderExcludes.filter(identity),
          orderChoices: orderChoices.filter(identity)
        };
      }, action.payload.entities.orderItems);
      return orderItems;
    })
    .handleAction(actions.fetchBillAsync.failure, () => {
      return {};
    });

// export const all = createReducer({} as TransactionMap)
//     .handleAction(getType(wsActions.confirmedPayment), (state, action) => {
//       console.log('hello', action.payload);
//       return {};
//     });


const transactionReducer = combineReducers({
  orders,
  orderItemsCount,
  subtotal,
  items
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