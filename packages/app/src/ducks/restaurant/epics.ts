import { of, from } from 'rxjs';
import { mergeMap, exhaustMap, map, catchError, debounceTime } from 'rxjs/operators';
import { Epic, ofType } from 'redux-observable';
import { push } from 'connected-react-router';
import { checkinAsync, fetchStatusAsync, favRestaurantAsync, fetchRestaurantsAsync } from './actions';
import { getType } from 'typesafe-actions';
import * as API from '@dinify/common/src/api/v2/restaurant';
// TODO: fix this shit
import { currentT as t } from '@dinify/common/src/lib/i18n/useTranslation';

import { getCookie, handleEpicAPIError } from '@dinify/common/src/lib/FN';
const snackbar = require('material-ui-snackbar-redux').snackbarActions;
const APIv1 = require('@dinify/common/src/api/restaurant');

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

const checkinEpic: Epic = (action$) =>
  action$.pipe(
    ofType(getType(checkinAsync.request)),
    debounceTime(500),
    exhaustMap((action: any) => {
      const { payload: { qr, pathname } } = action;
      if (getCookie('access_token') === '') {
        return of(checkinAsync.failure([{ status: 401 }]));
      }
      return from(API.Checkin({ qr })).pipe(
        mergeMap((res: any) => of(
          checkinAsync.success(res),
          fetchStatusAsync.request(),
          push(pathname),
          snackbar.show({
            message: t('successMessages.you-are-now-checked-in'),
            handleAction: () => window.location.assign(pathname),
            action: 'See menu'
          })
        )),
        catchError(error => handleEpicAPIError({
          error,
          failActionType: getType(checkinAsync.failure),
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
      return from(APIv1.FavRestaurant(payload)).pipe(
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
  fetchCheckinStatusEpic,
  checkinEpic,
  favEpic
];
