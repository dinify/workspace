import { of, from } from 'rxjs';
import { mergeMap, exhaustMap, map, catchError, debounceTime, tap } from 'rxjs/operators';
import { Epic, ofType } from 'redux-observable';
import { execCheckinAsync, fetchStatusAsync, favRestaurantAsync, fetchRestaurantsAsync, fetchRestaurantAsync } from './actions';
import { getType } from 'typesafe-actions';
import * as API from '@dinify/common/src/api/v2/restaurant';

import { handleEpicAPIError } from '@dinify/common/src/lib/FN';
import * as uiActions from '../ui/actions';

const fetchRestaurantsEpic: Epic = (action$) =>
  action$.pipe(
    ofType(getType(fetchRestaurantsAsync.request)),
    mergeMap((action) => from(API.GetListOfRestaurants()).pipe(
      map((res: any) => {
        return fetchRestaurantsAsync.success(res);
      }),
      catchError(error => {
        return handleEpicAPIError({
          error,
          failActionType: getType(fetchRestaurantsAsync.failure),
          initAction: action
        })
      })
    ))
  );

const fetchRestaurantEpic: Epic = (action$) =>
  action$.pipe(
    ofType(getType(fetchRestaurantAsync.request)),
    mergeMap((action) => from(API.GetRestaurantById({ 
      restaurantId: action.payload.subdomain
    })).pipe(
      map((res: any) => {
        return fetchRestaurantAsync.success(res);
      }),
      catchError(error => {
        return handleEpicAPIError({
          error,
          failActionType: getType(fetchRestaurantAsync.failure),
          initAction: action
        })
      })
    ))
  );

const fetchCheckinStatusEpic: Epic = (action$) =>
  action$.pipe(
    ofType(getType(fetchStatusAsync.request)),
    mergeMap((action) => from(API.CheckinStatus()).pipe(
      map((res: any) => {
        return fetchStatusAsync.success(res);
      }),
      catchError(error => {
        return handleEpicAPIError({
          error,
          failActionType: getType(fetchStatusAsync.failure),
          initAction: action
        })
      })
    ))
  );

const checkinEpic: Epic = (action$, state$, { history }) =>
  action$.pipe(
    ofType(getType(execCheckinAsync.request)),
    mergeMap((action: any) => {

      const { checkinPlan } = state$.value.restaurant;

      if (!checkinPlan) {
        return of(execCheckinAsync.failure('no-checkin-plan'));
      }

      const { qr, pathname } = checkinPlan;

      return from(API.Checkin({ qr })).pipe(
        tap(() => {
          history.push(pathname)
        }),
        mergeMap((res: any) => of(
          execCheckinAsync.success(res),
          fetchStatusAsync.request(),
          uiActions.showSnackbarAction({
            message: t => t('successMessages.you-are-now-checked-in')
          })
        )),
        catchError(error => handleEpicAPIError({
          error,
          failActionType: getType(execCheckinAsync.failure),
          initAction: action
        }))
      );
    })
  );

const favEpic: Epic = (action$) =>
  action$.pipe(
    ofType(getType(favRestaurantAsync.request)),
    debounceTime(500),
    exhaustMap((action: any) => {
      const { payload } = action;
      const { restaurantId, fav } = payload;
      return from(API.FavRestaurant({ restaurantId, fav })).pipe(
        map((res: any) => favRestaurantAsync.success({ res, initPayload: payload })),
        catchError(error => handleEpicAPIError({
          error,
          failActionType: getType(favRestaurantAsync.failure),
          initAction: action
        }))
      )
    })
  );

export default [
  fetchRestaurantsEpic,
  fetchRestaurantEpic,
  fetchCheckinStatusEpic,
  checkinEpic,
  favEpic
];
