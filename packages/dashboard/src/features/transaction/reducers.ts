import { createReducer } from 'typesafe-actions';
import { combineReducers } from 'redux';
import { fetchTransactionsAsync } from './actions';

export const all = createReducer({} as any)

  .handleAction(fetchTransactionsAsync.success, (state, action) => {
    const transactions = action.payload;
    return transactions;
  });


const transactionReducer = combineReducers({
  all
});

export default transactionReducer;
export type TransactionState = ReturnType<typeof transactionReducer>;
