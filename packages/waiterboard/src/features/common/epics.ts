import { of, from } from 'rxjs';
import { mergeMap, map, catchError } from 'rxjs/operators';
import { ofType, Epic } from 'redux-observable';
import * as API from '@dinify/common/src/api/v2/restaurant';
import { handleEpicAPIError } from '@dinify/common/src/lib/FN';
import * as commonTypes from './types';

declare global {
  interface Document { instanceId: string; }
}

document.instanceId = document.instanceId || '';

const confirmationSyncEpic: Epic = (action$, state$) =>
  action$.pipe(
    ofType(commonTypes.CONFIRMATION_DONE),
    mergeMap((action) => {

      const { payload } = action;

      if (payload.stopPropagation) {
        return of({ type: commonTypes.CONFIRMATIONSYNC_DONE });
      }

      const waiterboardId = state$.value.app.selectedWBId;

      const promise = API.Notify({
        sendTo: [`waiterboard/${waiterboardId}`],
        type: 'confirmation',
        payload: { ...payload, instanceId: document.instanceId }
      });

      return from(promise).pipe(
        map(() => ({ type: commonTypes.CONFIRMATIONSYNC_DONE })),
        catchError(error => handleEpicAPIError({
          error,
          failActionType: commonTypes.CONFIRMATION_FAIL,
          initAction: action
        }))
      );

    })
  );

export default [
  confirmationSyncEpic,
];
