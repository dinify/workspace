import { Observable } from 'rxjs'
import R from 'ramda'
import * as API from 'api/restaurant'
import { ListToMap } from 'lib/FN'

const loadCallEpic = (action$: Observable, { getState }) =>
  action$
  .ofType('LOAD_CALL_INIT')
  .switchMap(() => {
    const waiterboardId = getState().restaurant.selectedWBId
    return Observable.fromPromise(API.GetCalls({ waiterboardId }))
      .mergeMap((calls) => {
        const userIds = R.pluck('initiator', calls).filter((id) => id.length === 24)
        return [
          {
            type: 'FETCHALL_USER_INIT',
            payload: { ids: userIds, cache: true }
          },
          {
            type: 'LOAD_CALL_DONE',
            payload: {res: ListToMap(calls) }
          }
        ]
      })
      .catch(error => Observable.of({ type: 'ERROR' }))
  })

export default [
  loadCallEpic,
]
