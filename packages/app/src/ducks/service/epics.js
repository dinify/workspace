import { of, from } from 'rxjs';
import { mergeMap, switchMap, catchError } from 'rxjs/operators';
import { ofType } from 'redux-observable';
import { snackbarActions as snackbar } from 'material-ui-snackbar-redux'
import * as API from '@dinify/common/dist/api/restaurant';
import { handleEpicAPIError } from '@dinify/common/dist/lib/FN';
import types from './types';
import { callServiceDone } from './actions';

const callServiceEpic = (action$) =>
  action$.pipe(
    ofType(types.CALL_SERVICE_INIT),
    switchMap((action) => {
      const { payload: { serviceId } } = action;
      return from(API.CallService({ serviceId })).pipe(
        mergeMap(res => of(
          callServiceDone(res),
          snackbar.show({
            message: 'Service called',
            action: 'See menu',
            handleAction: () => window.location.assign('/')
          })
        )),
        catchError(error => handleEpicAPIError({
          error,
          failActionType: types.CALL_SERVICE_FAIL,
          initAction: action
        }))
    )})
  );

export default [
  callServiceEpic
];
