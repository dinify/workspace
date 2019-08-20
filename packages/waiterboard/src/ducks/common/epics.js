import { of, from } from 'rxjs';
import { mergeMap, switchMap, map, catchError, filter } from 'rxjs/operators';
import { ofType } from 'redux-observable';
import * as API from '@dinify/common/dist/api/restaurant';
import { handleEpicAPIError } from '@dinify/common/dist/lib/FN';
import * as commonTypes from 'ducks/common/types';
import { confirmationFail } from 'ducks/common/actions';

const capitalize = (str) => str.charAt(0).toUpperCase() + str.slice(1);
const camel = (str) => capitalize(str.toLowerCase());
const withoutPath = type => type.match(/\w+(?:\.\w+)*$/g)[0];
const actionEssence = (str) => camel(withoutPath(str).split('_')[0]);

const confirmationEpic = (action$) =>
  action$.pipe(
    filter(action => action.type.includes('CONFIRMATION') && action.type.includes('INIT')),
    switchMap((action) => {
      const { type, payload } = action;
      const APIcall = API[`Confirm${actionEssence(type)}`]
      return from(APIcall({...payload})).pipe(
        // delay(200)
        map(() => ({
          type: commonTypes.CONFIRMATION_DONE,
          payload: { type: actionEssence(type), ...payload }
        })),
        catchError(error => handleEpicAPIError({
          error,
          failActionType: confirmationFail(error),
          initAction: action
        }))
      )
    })
  )

const confirmationSyncEpic = (action$, state$) =>
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
          failActionType: confirmationFail(error),
          initAction: action
        }))
      )
    })
  )

export default [
  confirmationEpic,
  confirmationSyncEpic,
];
