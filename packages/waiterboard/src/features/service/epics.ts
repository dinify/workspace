import { from as fromPromise } from 'rxjs';
import { ofType, Epic } from 'redux-observable';
import { mergeMap, map, catchError } from 'rxjs/operators';
import { handleEpicAPIError } from '@dinify/common/src/lib/FN';
import * as API from '@dinify/common/src/api/v2/restaurant';
import { getType } from 'typesafe-actions';
import { fetchServicesAsync } from './actions';


const fetchServicesEpic: Epic = (action$, state$) =>
  action$.pipe(
    ofType(getType(fetchServicesAsync.request)),
    mergeMap((action) => {
      const restaurantId = state$.value.app.selectedRestaurant;

      return fromPromise(API.GetServicesOfRestaurant({ restaurantId, defLang: true })).pipe(
        map((res) => fetchServicesAsync.success(res)),
        catchError(error => handleEpicAPIError({
          error,
          failActionType: getType(fetchServicesAsync.failure),
          initAction: action
        }))
      );
      
    })
  );

export default [
  fetchServicesEpic
]
