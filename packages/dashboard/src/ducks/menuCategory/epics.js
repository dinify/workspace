import { from as fromPromise } from 'rxjs';
import { ofType } from 'redux-observable';
import { mergeMap, map, catchError } from 'rxjs/operators';
import { handleEpicAPIError } from '@dinify/common/dist/lib/FN';
import * as API from '@dinify/common/src/api/v2/restaurant.ts';
import pick from 'ramda/es/pick';


const createMenuCategoryEpic = (action$, state$) =>
  action$.pipe(
    ofType('POST_MENUCATEGORY_INIT'),
    mergeMap((action) => {

      const restaurantId = state$.value.restaurant.selectedRestaurant;
      const payload = action.payload;

      const body = {
        ...pick(['precedence', 'name'], payload),
        restaurantId
      };

      return fromPromise(API.CreateMenuCategory(body)).pipe(
        map((res) => ({
          type: 'POST_MENUCATEGORY_DONE',
          payload: res,
          meta: payload
        })),
        catchError(error => handleEpicAPIError({
          error,
          failActionType: 'POST_MENUCATEGORY_FAIL',
          initAction: action
        }))
      );
    })
  );

export default [
  createMenuCategoryEpic
];
