import { from as fromPromise } from 'rxjs';
import { mergeMap, catchError, map as rxMap} from 'rxjs/operators';
import { ofType, Epic } from 'redux-observable';
import * as types from './types';
import { getType } from 'typesafe-actions';
import * as API from '@dinify/common/src/api/v2/restaurant';
import { fetchOptionsAsync } from './actions';
import { handleEpicAPIError } from '@dinify/common/src/lib/FN';
const snackbar = require('material-ui-snackbar-redux').snackbarActions;

const fetchOptionsEpic: Epic = (action$, state$) =>
  action$.pipe(
    ofType(getType(fetchOptionsAsync.request)),
    mergeMap((action) => {
      const restaurantId = state$.value.restaurant.selectedRestaurant;
      return fromPromise(API.GetRestaurantOptions({ restaurantId })).pipe(
        rxMap((res: any) => {
          return fetchOptionsAsync.success(res);
        }),
        catchError(error => {
          return handleEpicAPIError({
            error,
            failActionType: getType(fetchOptionsAsync.failure),
            initAction: action
          })
        })
      );
    })
  );

const onCreateFailSnackbarsEpic: Epic = (action$, state$, { i18nInstance }) =>
  action$.pipe(
    ofType(types.CREATE_OPTION_FAIL),
    rxMap(() => snackbar.show({
      message: i18nInstance.t('createOptionFail')
    }))
  );

export default [
  fetchOptionsEpic,
  onCreateFailSnackbarsEpic
]
