import { Observable } from 'rxjs'
import R from 'ramda'
import * as API from 'api/restaurant'

const clearTableEpic = (action$: Observable) =>
  action$
    .filter(action => action.type === 'CLEAR_TABLE_INIT')
    .switchMap(({ payload }) => {
      if(!global.confirm('Do you really want to check-out this table?')) return Observable.of({type: "CLEAR_TABLE_CANCELED"});
      return Observable.fromPromise(API.CheckOut({tableId: payload.table.id }))
        .map(() => ({type: 'CLEAR_TABLE_DONE', payload }))
        .catch(error => Observable.of(({type: 'CLEAR_TABLE_FAIL'})))
    });

const clearUserEpic = (action$: Observable) =>
  action$
    .filter(action => action.type === 'CLEAR_USER_INIT')
    .switchMap(({ payload }) => {
      if(!global.confirm('Do you really want to check-out this user?')) return Observable.of({type: "CLEAR_USER_CANCELED"});
      return Observable.fromPromise(API.CheckOutUser({userId: payload.userId }))
        .map(() => ({type: 'CLEAR_USER_DONE', payload }))
        .catch(error => Observable.of(({type: 'CLEAR_USER_FAIL', payload: error})))
    });

export default [
  clearTableEpic,
  clearUserEpic
]
