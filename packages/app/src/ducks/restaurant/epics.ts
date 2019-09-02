import { of, from } from 'rxjs';
import { filter, mergeMap, exhaustMap, map, catchError, debounceTime } from 'rxjs/operators';
import { Epic } from 'redux-observable';
import { push } from 'connected-react-router';
import { checkinAsync, fetchStatusAsync, favRestaurantAsync } from './actions';
import { isActionOf } from 'typesafe-actions';

const { getCookie, handleEpicAPIError } = require('@dinify/common/dist/lib/FN');
const API = require('@dinify/common/dist/api/restaurant');
const snackbar = require('material-ui-snackbar-redux').snackbarActions;

const checkinEpic: Epic = (action$) =>
  action$.pipe(
    filter(isActionOf(checkinAsync.request)),
    debounceTime(500),
    exhaustMap((action: any) => {
      const { payload: { qr, pathname } } = action;
      if (getCookie('access_token') === '') {
        return of(checkinAsync.failure([{ status: 401 }]));
      }
      return from(API.Checkin({
        qr,
        node: true
      })).pipe(
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
          failActionType: checkinAsync.failure,
          initAction: action
        }))
      );
    })
  );

const favEpic: Epic = (action$) =>
  action$.pipe(
    filter(isActionOf(favRestaurantAsync.request)),
    debounceTime(500),
    exhaustMap((action: any) => {
      const { payload } = action;
      return from(API.FavRestaurant(payload)).pipe(
        map((res: any) => favRestaurantAsync.success({ res, initPayload: payload })),
        catchError(error => handleEpicAPIError({
          error,
          failActionType: favRestaurantAsync.failure,
          initAction: action
        }))
      )
    })
  );

export default [
  checkinEpic,
  favEpic
];