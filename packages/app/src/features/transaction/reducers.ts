import * as actions from './actions';
// import * as wsActions from '../../websockets/actions';
import { createReducer, createAction } from 'typesafe-actions';
import { combineReducers } from 'redux';
import { Subtotal, OrderItemNMap, OrderItemN } from 'CartModels';
import { OrderNMap } from 'TransactionModels';
import mapObjIndexed from 'ramda/es/mapObjIndexed';
import { actionTypes as fActionTypes } from 'react-redux-firebase';

const resetActions = [
  actions.fetchBillAsync.failure,
  createAction(fActionTypes.LOGOUT)<any>()
];

export const orders = createReducer({} as OrderNMap)
  .handleAction(actions.fetchBillAsync.success, (state, action) => {
    return action.payload.entities.orders;
  })
  .handleAction(resetActions, () => ({}));


export const orderItemsCount = createReducer(0 as number)
  .handleAction(actions.fetchBillAsync.success, (state, action) => {
    return action.payload.result.count;
  })
  .handleAction(resetActions, () => 0);


const defaultSubtotal: Subtotal = {
  amount: 0,
  currency: 'CZK',
  precision: 2
}

export const subtotal = createReducer(defaultSubtotal as Subtotal)
  .handleAction(actions.fetchBillAsync.success, (state, action) => {
    return action.payload.result.subtotal;
  })
  .handleAction(resetActions, () => defaultSubtotal);


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
  .handleAction(resetActions, () => ({}));

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