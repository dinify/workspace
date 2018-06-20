// @flow
import { Observable } from 'rxjs';
import { fetchRestaurantsInit, fetchStatusInit } from 'ducks/restaurant/actions';
import { fetchMeInit } from 'ducks/user/actions';

const bootstrapEpic = (action$: Observable) =>
  action$
    .ofType('persist/REHYDRATE')
    .mergeMap(() => Observable.of(
      fetchRestaurantsInit(),
      fetchMeInit(),
      fetchStatusInit()
    ));

export default [bootstrapEpic];
