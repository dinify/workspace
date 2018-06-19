import { Observable } from 'rxjs'
import { fetchRestaurantsInit } from 'ducks/restaurant/actions'

const bootstrapEpic = (action$: Observable) =>
  action$
    .ofType('persist/REHYDRATE')
    .switchMap(() =>
      Observable.of(fetchRestaurantsInit())
    )

export default [
  bootstrapEpic
]
