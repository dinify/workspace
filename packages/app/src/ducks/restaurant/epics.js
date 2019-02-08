// @flow
import { Observable, of, from } from 'rxjs';
import { mergeMap, exhaustMap, map, catchError, filter, ignoreElements, tap, debounceTime } from 'rxjs/operators';
import { ofType } from 'redux-observable';
import * as API from '@dinify/common/dist/api/restaurant';
import { snackbarActions as snackbar } from 'material-ui-snackbar-redux'
import { fetchStatusInit } from 'ducks/restaurant/actions';
import { getCookie } from '@dinify/common/dist/lib/FN';
import types from './types';
import { checkinFail, checkinDone, favRestaurantDone, favRestaurantFail } from './actions';


type CheckinProps = {
  payload: {
    qr?: string,
    code?: string,
  }
}

const checkinEpic = (action$: Observable) =>
  action$.pipe(
    ofType(types.CHECKIN_INIT),
    debounceTime(500),
    exhaustMap(({ payload }: CheckinProps) => {
      console.log('fire');
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

type FavProps = {
  payload: {
    id: string,
    fav: boolean,
  }
}
const favEpic = (action$: Observable) =>
  action$.pipe(
    ofType(types.FAV_RESTAURANT_INIT),
    debounceTime(500),
    exhaustMap(({ payload }: FavProps) => {
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
