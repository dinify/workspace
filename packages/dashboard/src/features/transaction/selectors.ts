import { createSelector } from 'reselect';
import { MapToList } from '@dinify/common/src/lib/FN';

export const allTransactions = (state: any) => state.transaction.all;

export const getTransactionsList = createSelector(
  [
    allTransactions
  ],
  (all) => {
    return MapToList(all);
  }
);
