import { of, from } from 'rxjs';
import { mergeMap, catchError, map, debounceTime } from 'rxjs/operators';
import { ofType, Epic } from 'redux-observable';
import * as API from '@dinify/common/src/api/v2/restaurant';
import { handleEpicAPIError } from '@dinify/common/src/lib/FN';
import { callServiceAsync, fetchServicesAsync } from './actions';
// TODO: fix this shit
import { currentT as t } from '@dinify/common/src/lib/i18n/translations';
import { getType } from 'typesafe-actions';

import { snackbarActions as snackbar } from 'material-ui-snackbar-redux';

const fetchServicesEpic: Epic = (action$) =>
  action$.pipe(
    ofType(getType(fetchServicesAsync.request)),
    mergeMap((action) => from(API.GetServicesOfRestaurant({
      restaurantId: action.payload.restaurantId
    })).pipe(
      map((res: any) => {
        return fetchServicesAsync.success(res);
      }),
      catchError(error => {
        return handleEpicAPIError({
          error,
          failActionType: getType(fetchServicesAsync.failure),
          initAction: action
        })
      })
    ))
  );

const callServiceEpic: Epic = (action$) =>
  action$.pipe(
    ofType(getType(callServiceAsync.request)),
    debounceTime(1000),
    mergeMap((action) => {
      const { payload: { serviceId } } = action;
      return from(API.CallService({ serviceId })).pipe(
        mergeMap(res => of(
          callServiceAsync.success(res),
          snackbar.show({
            message: t('successMessages.service-called')
          })
        )),
        catchError(error => handleEpicAPIError({
          error,
          failActionType: callServiceAsync.failure,
          initAction: action
        }))
    )})
  );

export default [
  fetchServicesEpic,
  callServiceEpic
];
