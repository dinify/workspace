import { from as fromPromise, of } from 'rxjs';
import { ofType } from 'redux-observable';
import { mergeMap, map, catchError } from 'rxjs/operators';
import { handleEpicAPIError } from '@dinify/common/src/lib/FN';
import * as API from '@dinify/common/src/api/v2/restaurant.ts';
import { snackbarActions as snackbar } from 'material-ui-snackbar-redux';
import pick from 'ramda/es/pick';
import { currentT as t } from '@dinify/common/src/lib/i18n/translations';

const fetchServicesEpic = (action$, state$) =>
  action$.pipe(
    ofType('GET_SERVICES_INIT'),
    mergeMap(action => {
      const restaurantId = state$.value.restaurant.selectedRestaurant;
      return fromPromise(API.GetServicesOfRestaurant({ restaurantId })).pipe(
        map(res => ({
          type: 'GET_SERVICES_DONE',
          payload: res,
        })),
        catchError(error =>
          handleEpicAPIError({
            error,
            failActionType: 'GET_SERVICES_FAIL',
            initAction: action,
          }),
        ),
      );
    }),
  );

const createServiceEpic = (action$, state$) =>
  action$.pipe(
    ofType('POST_SERVICE_INIT'),
    mergeMap(action => {
      const restaurantId = state$.value.restaurant.selectedRestaurant;
      const payload = action.payload;

      if (!payload.imageId) {
        return of(
          snackbar.show({
            message: t('Select service icon before submitting'),
          }),
          { type: 'POST_SERVICE_FAIL', initPayload: payload },
        );
      }

      const body = {
        ...pick(['imageId', 'type', 'name'], payload),
        restaurantId,
      };

      return fromPromise(API.CreateService(body)).pipe(
        map(res => ({
          type: 'POST_SERVICE_DONE',
          payload: res,
          meta: payload,
        })),
        catchError(error =>
          handleEpicAPIError({
            error,
            failActionType: 'POST_SERVICE_FAIL',
            initAction: action,
          }),
        ),
      );
    }),
  );

const onCreateDoneSnackbarEpic = action$ =>
  action$.pipe(
    ofType('POST_SERVICE_DONE'),
    mergeMap(() => {
      return of(
        snackbar.show({
          message: t('saved'),
        }),
      );
    }),
  );

export default [fetchServicesEpic, createServiceEpic, onCreateDoneSnackbarEpic];
