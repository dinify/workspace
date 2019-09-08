import { of, from } from 'rxjs';
import { mergeMap, exhaustMap, map, catchError, debounceTime } from 'rxjs/operators';
import { Epic, ofType } from 'redux-observable';
import { push } from 'connected-react-router';
import { checkinAsync, fetchStatusAsync, favRestaurantAsync } from './actions';
import { getType } from 'typesafe-actions';
import * as API from '@dinify/common/src/api/v2/restaurant';

const { getCookie, handleEpicAPIError } = require('@dinify/common/dist/lib/FN');
const snackbar = require('material-ui-snackbar-redux').snackbarActions;
const APIv1 = require('@dinify/common/src/api/restaurant');

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
            message: 'You are now checked in',
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
  checkinEpic,
  favEpic
];
