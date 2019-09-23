import { of, from } from 'rxjs';
import { mergeMap, catchError, map } from 'rxjs/operators';
import { ofType, Epic } from 'redux-observable';
import * as API from '@dinify/common/src/api/v2/restaurant';
import { handleEpicAPIError } from '@dinify/common/dist/lib/FN';
import { callServiceAsync, fetchServicesAsync } from './actions';
import { i18nInstance } from '../../web';
import { getType } from 'typesafe-actions';

const snackbar = require('material-ui-snackbar-redux').snackbarActions;

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
    mergeMap((action) => {
      const { payload: { serviceId } } = action;
      return from(API.CallService({ serviceId })).pipe(
        mergeMap(res => of(
          callServiceAsync.success(res),
          snackbar.show({
            message: i18nInstance.t('successMessages.service-called')
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
