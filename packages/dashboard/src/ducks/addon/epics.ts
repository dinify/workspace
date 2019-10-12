import { from as fromPromise } from 'rxjs';
import { mergeMap, map, catchError, map as rxMap} from 'rxjs/operators';
import { ofType, Epic } from 'redux-observable';
import * as types from './types';
import { getType } from 'typesafe-actions';
import * as API from '@dinify/common/src/api/v2/restaurant';
import { handleEpicAPIError } from '@dinify/common/src/lib/FN';
import { fetchAddonsAsync } from './actions';


const snackbar = require('material-ui-snackbar-redux').snackbarActions;


const fetchAddonsEpic: Epic = (action$, state$) =>
  action$.pipe(
    ofType(getType(fetchAddonsAsync.request)),
    mergeMap((action) => {
      const restaurantId = state$.value.restaurant.selectedRestaurant;
      return fromPromise(API.GetRestaurantAddons({ restaurantId })).pipe(
        rxMap((res: any) => {
          return fetchAddonsAsync.success(res);
        }),
        catchError(error => {
          return handleEpicAPIError({
            error,
            failActionType: getType(fetchAddonsAsync.failure),
            initAction: action
          })
        })
      );
    })
  );

const onCreateFailSnackbarsEpic: Epic = (action$, state$, { i18nInstance }) =>
  action$.pipe(
    ofType(types.CREATE_ADDON_FAIL),
    map(() => snackbar.show({
      message: i18nInstance.t('createAddonFail')
    }))
  );

export default [
  fetchAddonsEpic,
  onCreateFailSnackbarsEpic
]
