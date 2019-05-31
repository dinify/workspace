
import { Observable, of, from } from 'rxjs';
import { mergeMap, switchMap, catchError } from 'rxjs/operators';
import { ofType } from 'redux-observable';
import * as API from '@dinify/common/dist/api/restaurant';
import types from './types';
import { callServiceDone, callServiceFail } from './actions';
import { snackbarActions as snackbar } from 'material-ui-snackbar-redux'

const callServiceEpic = (action$: Observable) =>
  action$.pipe(
    ofType(types.CALL_SERVICE_INIT),
    switchMap(({ payload: { serviceId } }) => {
      return from(API.CallService({ serviceId })).pipe(
        mergeMap(res => of(
          callServiceDone(res),
          snackbar.show({
            message: 'Service called',
            action: 'See menu',
            handleAction: () => window.location.assign('/')
          })
        )),
        catchError(error => of(callServiceFail(error)))
    )})
  );

export default [
  callServiceEpic
];
