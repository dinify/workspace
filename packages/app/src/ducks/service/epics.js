import { of, from } from 'rxjs';
import { mergeMap, catchError } from 'rxjs/operators';
import { ofType } from 'redux-observable';
import { snackbarActions as snackbar } from 'material-ui-snackbar-redux'
import * as API from '@dinify/common/src/api/v2/restaurant.ts';
import { handleEpicAPIError } from '@dinify/common/dist/lib/FN';
import * as types from './types';
import { callServiceDone } from './actions';
import { i18nInstance } from '../../web';

const callServiceEpic = (action$) =>
  action$.pipe(
    ofType(types.CALL_SERVICE_INIT),
    mergeMap((action) => {
      const { payload: { serviceId } } = action;
      return from(API.CallService({ serviceId })).pipe(
        mergeMap(res => of(
          callServiceDone(res),
          snackbar.show({
            message: i18nInstance.t('successMessages.service-called')
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
