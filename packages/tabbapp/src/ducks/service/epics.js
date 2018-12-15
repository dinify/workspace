// @flow
import { Observable } from 'rxjs';
import * as API from 'tabb-front/dist/api/restaurant';
import types from './types';
import { callServiceDone, callServiceFail } from './actions';
import { snackbarActions as snackbar } from 'material-ui-snackbar-redux'

const callServiceEpic = (action$: Observable) =>
  action$
    .ofType(types.CALL_SERVICE_INIT)
    .switchMap(({ payload: { serviceId } }) => {
      return Observable.fromPromise(API.CallService({ serviceId }))
        .mergeMap(res => {
          return Observable.of(
            callServiceDone(res),
            snackbar.show({
              message: 'Service called',
              action: 'See menu',
              handleAction: () => window.location.assign('/')
            })
          );
        })
        .catch(error => Observable.of(callServiceFail(error)))
    });

export default [
  callServiceEpic
];
