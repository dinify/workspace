import { of, from } from 'rxjs';
import { mergeMap, exhaustMap, map, catchError, debounceTime } from 'rxjs/operators';
import { ofType } from 'redux-observable';
import * as API from '@dinify/common/dist/api/restaurant';
import { snackbarActions as snackbar } from 'material-ui-snackbar-redux'
import { fetchStatusInit } from 'ducks/restaurant/actions';
import { getCookie } from '@dinify/common/dist/lib/FN';
import types from './types';
import { checkinFail, checkinDone, favRestaurantDone, favRestaurantFail } from './actions';

const checkinEpic = (action$) =>
  action$.pipe(
    ofType(types.CHECKIN_INIT),
    debounceTime(500),
    exhaustMap(({ payload }) => {
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
        catchError(error => of(checkinFail(error)))
      );
    })
  );

const favEpic = (action$) =>
  action$.pipe(
    ofType(types.FAV_RESTAURANT_INIT),
    debounceTime(500),
    exhaustMap(({ payload }) => {
      return from(API.FavRestaurant(payload)).pipe(
        map((res) => favRestaurantDone({res, prePayload: payload })),
        catchError(error => of(favRestaurantFail({error, prePayload: payload })))
      )
    })
  );

export default [
  checkinEpic,
  favEpic
];
