import { of, from } from 'rxjs';
import { switchMap, map, catchError, filter } from 'rxjs/operators';
import * as API from '@dinify/common/dist/api/restaurant';
import { handleEpicAPIError } from '@dinify/common/dist/lib/FN';

const clearTableEpic = (action$) =>
  action$.pipe(
    filter(action => action.type === 'CLEAR_TABLE_INIT'),
    switchMap((action) => {
      const { payload } = action;
      if (!global.confirm('Do you really want to check-out this table?')) {
        return of({type: "CLEAR_TABLE_CANCELED"});
      }
      return from(API.CheckOut({ tableId: payload.table.id, node: true })).pipe(
        map(() => ({type: 'CLEAR_TABLE_DONE', payload })),
        catchError(error => handleEpicAPIError({
          error,
          failActionType: 'CLEAR_TABLE_FAIL',
          initAction: action
        }))
      )
    })
  );

const clearUserEpic = (action$) =>
  action$.pipe(
    filter(action => action.type === 'CLEAR_USER_INIT'),
    switchMap((action) => {
      const { payload } = action;
      if (!global.confirm('Do you really want to check-out this user?')) {
        return of({type: "CLEAR_USER_CANCELED"});
      }
      return from(API.CheckOutUser({userId: payload.userId, node: true })).pipe(
        map(() => ({type: 'CLEAR_USER_DONE', payload })),
        catchError(error => handleEpicAPIError({
          error,
          failActionType: 'CLEAR_USER_FAIL',
          initAction: action
        }))
      )
    })
  );

export default [
  clearTableEpic,
  clearUserEpic
];
