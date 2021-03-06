import { of, from } from 'rxjs';
import {
  mergeMap, catchError, map as rxMap,
  // debounceTime 
} from 'rxjs/operators';
import { ofType, Epic } from 'redux-observable';
import * as API from '@dinify/common/src/api/v2/restaurant';
import { handleEpicAPIError } from '@dinify/common/src/lib/FN';
import { callServiceAsync, fetchServicesAsync } from './actions';
import { getType } from 'typesafe-actions';

import { actions as uiActions } from 'models/ui';
import { TFunction } from '@dinify/common/src/lib/i18n/translations';

const fetchServicesEpic: Epic = (action$) =>
  action$.pipe(
    ofType(getType(fetchServicesAsync.request)),
    mergeMap((action) =>
      from(API.GetServicesOfRestaurant({
        restaurantId: action.payload.restaurantId
      })).pipe(
        rxMap((res: any) => {
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
          uiActions.showSnackbar({
            message: (t: TFunction) => t('successMessages.service-called')
          })
        )),
        catchError(error => handleEpicAPIError({
          error,
          failActionType: getType(callServiceAsync.failure),
          initAction: action,
          nextActions: [
            uiActions.showSnackbar({
              message: () => 'Error'
            })
          ]
        })),
      )
    })
  );

export default [
  fetchServicesEpic,
  callServiceEpic
];
