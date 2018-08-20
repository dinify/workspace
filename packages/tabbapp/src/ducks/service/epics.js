// @flow
import { Observable } from 'rxjs';
import * as API from 'api/restaurant';
import types from './types';
import { callServiceDone, callServiceFail } from './actions';

const callServiceEpic = (action$: Observable) =>
  action$
    .ofType(types.CALL_SERVICE_INIT)
    .switchMap(({ payload: { serviceId } }) => {
      return Observable.fromPromise(API.CallService({ serviceId }))
        .mergeMap(res => {
          return Observable.of(callServiceDone(res));
        })
        .catch(error => Observable.of(callServiceFail(error)))
    });

export default [
  callServiceEpic
];
