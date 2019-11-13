import { of, from } from 'rxjs';
import { switchMap, map, catchError } from 'rxjs/operators';
import * as API from '@dinify/common/src/api/v2/restaurant';
import { handleEpicAPIError } from '@dinify/common/src/lib/FN';
import { Epic, ofType } from 'redux-observable';
import { getType } from 'typesafe-actions';
import { checkoutTableAsync, checkoutUserAsync, updateTableAsync } from './actions';

const clearTableEpic: Epic = (action$) =>
  action$.pipe(
    ofType(getType(checkoutTableAsync.request)),

    switchMap((action) => {
      const { payload } = action;

      if (!window.confirm('Do you really want to check-out this table?')) {
        return of(checkoutTableAsync.cancel('cancelled-by-user'));
      }

      return from(API.CheckOut({ tableId: payload.table.id })).pipe(
        map(() => checkoutTableAsync.success(payload)),
        catchError(error => handleEpicAPIError({
          error,
          failActionType: getType(checkoutTableAsync.failure),
          initAction: action
        }))
      )

    })
  );

const clearUserEpic: Epic = (action$) =>
  action$.pipe(
    ofType(getType(checkoutUserAsync.request)),
    switchMap((action) => {
      const { payload } = action;

      if (!window.confirm('Do you really want to check-out this user?')) {
        return of(checkoutUserAsync.cancel('cancelled-by-user'));
      }

      return from(API.CheckOutUser({ userId: payload.userId })).pipe(
        map(() => checkoutUserAsync.success(payload)),
        catchError(error => handleEpicAPIError({
          error,
          failActionType: getType(checkoutUserAsync.failure),
          initAction: action
        }))
      )

    })
  );

const updateTableEpic: Epic = (action$) =>
  action$.pipe(
    ofType(getType(updateTableAsync.request)),
    switchMap((action) => {

      const { id, offline } = action.payload;

      return from(API.UpdateTable({ id, offline })).pipe(
        map((res) => updateTableAsync.success(res)),
        catchError(error => handleEpicAPIError({
          error,
          failActionType: getType(updateTableAsync.failure),
          initAction: action
        }))
      )

    })
  )

export default [
  clearTableEpic,
  clearUserEpic,
  updateTableEpic
];
