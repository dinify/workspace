import { of, from } from 'rxjs';
import { switchMap, map, catchError, filter } from 'rxjs/operators';
import * as API from '@dinify/common/dist/api/restaurant';

const clearTableEpic = (action$) =>
  action$.pipe(
    filter(action => action.type === 'CLEAR_TABLE_INIT'),
    switchMap(({ payload }) => {
      if (!global.confirm('Do you really want to check-out this table?')) {
        return of({type: "CLEAR_TABLE_CANCELED"});
      }
      return from(API.CheckOut({tableId: payload.table.id })).pipe(
        map(() => ({type: 'CLEAR_TABLE_DONE', payload })),
        catchError(error => of(({type: 'CLEAR_TABLE_FAIL', error})))
      )
    })
  );

const clearUserEpic = (action$) =>
  action$.pipe(
    filter(action => action.type === 'CLEAR_USER_INIT'),
    switchMap(({ payload }) => {
      if (!global.confirm('Do you really want to check-out this user?')) {
        return of({type: "CLEAR_USER_CANCELED"});
      }
      return from(API.CheckOutUser({userId: payload.userId })).pipe(
        map(() => ({type: 'CLEAR_USER_DONE', payload })),
        catchError(error => of(({type: 'CLEAR_USER_FAIL', payload: error})))
      )
    })
  );

export default [
  clearTableEpic,
  clearUserEpic
];
