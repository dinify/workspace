// @flow
import { Observable } from 'rxjs';
import * as API from 'tabb-front/dist/api/restaurant';
import { showSnackbar } from 'ducks/notifications/actions';
import types from './types';
import { callServiceDone, callServiceFail } from './actions';

const callServiceEpic = (action$: Observable) =>
  action$
    .ofType(types.CALL_SERVICE_INIT)
    .switchMap(({ payload: { serviceId } }) => {
      return Observable.fromPromise(API.CallService({ serviceId }))
        .mergeMap(res => {
          return Observable.of(
            callServiceDone(res),
            showSnackbar({
              message: 'Service called',
              redirect: '/',
              actionTitle: 'See menu'
            })
          );
        })
        .catch(error => Observable.of(callServiceFail(error)))
    });

export default [
  callServiceEpic
];
