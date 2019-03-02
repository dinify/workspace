// @flow
import { of } from 'rxjs';
import { mergeMap } from 'rxjs/operators';
import { ofType } from 'redux-observable';
import pluck from 'ramda/src/pluck'
import uniq from 'ramda/src/uniq'

const getUsersOfBillsEpic = (action$) =>
  action$.pipe(
    ofType('FETCH_TODAYBILLS_DONE'),
    mergeMap(({ payload }) => {
      const bills = payload.res;
      const userIds = uniq(pluck('initiator', bills));
      return of({
        type: 'FETCHALL_USER_INIT',
        payload: { ids: userIds, cache: true }
      })
    })
  )

export default [
  getUsersOfBillsEpic
]
