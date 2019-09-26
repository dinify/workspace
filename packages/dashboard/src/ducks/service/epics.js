import { from as fromPromise, of } from 'rxjs';
import { ofType } from 'redux-observable';
import { mergeMap, map, catchError } from 'rxjs/operators';
import { handleEpicAPIError } from '@dinify/common/dist/lib/FN';
import * as API from '@dinify/common/src/api/v2/restaurant.ts';
import { snackbarActions as snackbar } from 'material-ui-snackbar-redux';


const fetchServicesEpic = (action$, state$) =>
  action$.pipe(
    ofType('GET_SERVICES_INIT'),
    mergeMap((action) => {
      const restaurantId = state$.value.restaurant.selectedRestaurant;
      return fromPromise(API.GetServicesOfRestaurant({ restaurantId })).pipe(
        map((res) => ({
          type: 'GET_SERVICES_DONE',
          payload: res
        })),
        catchError(error => handleEpicAPIError({
          error,
          failActionType: 'GET_SERVICES_FAIL',
          initAction: action
        }))
      );
    })
  );

const createServiceEpic = (action$, state$) =>
  action$.pipe(
    ofType('POST_SERVICE_INIT'),
    mergeMap((action) => {
      const restaurantId = state$.value.restaurant.selectedRestaurant;
      const payload = action.payload;
      const body = {
        imageId: payload.imageId,
        type: payload.type,
        name: payload.name,
        restaurantId
      };
      return fromPromise(API.CreateService(body)).pipe(
        map((res) => ({
          type: 'POST_SERVICE_DONE',
          payload: res,
          meta: payload
        })),
        catchError(error => handleEpicAPIError({
          error,
          failActionType: 'POST_SERVICE_FAIL',
          initAction: action
        }))
      );
    })
  );

  const onCreateDoneSnackbarEpic = (action$) =>
  action$.pipe(
    ofType('POST_SERVICE_DONE'),
    mergeMap(() => {
      return of(snackbar.show({
        message: window.i18nInstance.t('saved'),
      }));
    })
  );

export default [
  fetchServicesEpic,
  createServiceEpic,
  onCreateDoneSnackbarEpic
];