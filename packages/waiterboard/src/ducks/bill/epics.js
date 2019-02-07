import { Observable } from 'rxjs'
import pluck from 'ramda/src/pluck'
import uniq from 'ramda/src/uniq'

const getUsersOfBillsEpic = (action$) =>
  action$
  .ofType('FETCH_TODAYBILLS_DONE')
  .mergeMap(({ payload }) => {
    const bills = payload.res;
    const userIds = uniq(pluck('initiator', bills));
    return Observable.of({
      type: 'FETCHALL_USER_INIT',
      payload: { ids: userIds, cache: true }
    })
  })

export default [
  getUsersOfBillsEpic
]
