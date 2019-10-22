import { from as fromPromise, of } from 'rxjs';
import { ofType } from 'redux-observable';
import { mergeMap, map, catchError } from 'rxjs/operators';
import { handleEpicAPIError } from '@dinify/common/dist/lib/FN';
import * as API from '@dinify/common/src/api/v2/restaurant.ts';


const fetchServicesEpic = (action$, state$) =>
  action$.pipe(
    ofType('GET_SERVICES_INIT'),
    mergeMap((action) => {
      const restaurantId = state$.value.app.selectedRestaurant;
      return fromPromise(API.GetServicesOfRestaurant({ restaurantId, defLang: true })).pipe(
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

export default [
  fetchServicesEpic
]
