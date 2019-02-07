// @flow
import { Observable } from 'rxjs'
import pluck from 'ramda/src/pluck'
import * as API from 'api/restaurant'

const loadCallEpic = (action$: Observable, { getState }) =>
  action$
  .ofType('LOAD_CALL_INIT')
  .switchMap(() => {
    const waiterboardId = getState().restaurant.selectedWBId
    return Observable.fromPromise(API.GetCalls({ waiterboardId }))
      .mergeMap((calls) => {
        const userIds = pluck('initiator', calls).filter((id) => id.length === 24)
        return [
          {
            type: 'FETCHALL_USER_INIT',
            payload: { ids: userIds, cache: true }
          },
          {
            type: 'LOAD_CALL_DONE',
            payload: {res: calls }
          }
        ]
      })
      .catch(error => Observable.of({ type: 'ERROR', payload: error }))
  })

export default [
  loadCallEpic,
]
