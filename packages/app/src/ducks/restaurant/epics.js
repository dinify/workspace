import { of, from } from 'rxjs';
import { mergeMap, exhaustMap, map, catchError, debounceTime } from 'rxjs/operators';
import { ofType } from 'redux-observable';
import * as API from '@dinify/common/dist/api/restaurant';
import { snackbarActions as snackbar } from 'material-ui-snackbar-redux'
import { fetchStatusInit } from 'ducks/restaurant/actions';
import { getCookie } from '@dinify/common/dist/lib/FN';
import { handleEpicAPIError } from '@dinify/common/dist/lib/FN';
import { checkinFail, checkinDone, favRestaurantDone } from './actions';
import types from './types';

const checkinEpic = (action$) =>
  action$.pipe(
    ofType(types.CHECKIN_INIT),
    debounceTime(500),
    exhaustMap((action) => {
      const { payload } = action;
      if (getCookie('access_token') === '') {
        return of(checkinFail([{ status: 401 }]));
      }
      return from(API.Checkin(payload)).pipe(
        mergeMap(res => of(
          checkinDone(res),
          fetchStatusInit(),
          snackbar.show({
            message: 'You are now checked in',
            handleAction: () => window.location.assign('/'),
            action: 'See menu'
          })
        )),
        catchError(error => handleEpicAPIError({
          error,
          failActionType: types.CHECKIN_FAIL,
          initAction: action
        }))
      );
    })
  );

const favEpic = (action$) =>
  action$.pipe(
    ofType(types.FAV_RESTAURANT_INIT),
    debounceTime(500),
    exhaustMap((action) => {
      const { payload } = action;
      return from(API.FavRestaurant(payload)).pipe(
        map((res) => favRestaurantDone({res, initPayload: payload })),
        catchError(error => handleEpicAPIError({
          error,
          failActionType: types.FAV_RESTAURANT_FAIL,
          initAction: action
        }))
      )
    })
  );

export default [
  checkinEpic,
  favEpic
];
