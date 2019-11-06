// import { } from 'TransactionModels';
import { createAsyncAction } from 'typesafe-actions';

const p = 'dinify/transactions';

export const fetchTransactionsAsync = createAsyncAction(
  `${p}/GET_TRANSACTIONS_INIT`,
  `${p}/GET_TRANSACTIONS_DONE`,
  `${p}/GET_TRANSACTIONS_FAIL`,
  `${p}/GET_TRANSACTIONS_CANCEL`,
)<undefined, any, any>();
