// @flow
import { Observable } from 'rxjs';
import * as API from 'tabb-front/dist/api/restaurant';
import { snackbarActions as snackbar } from 'material-ui-snackbar-redux'
import types from './types';
import { checkinFail, checkinDone, favRestaurantDone, favRestaurantFail } from './actions';
import { fetchStatusInit } from 'ducks/restaurant/actions';
import { getCookie } from 'tabb-front/dist/lib/FN';

type CheckinProps = {
  payload: {
    qr?: string,
    code?: string,
  }
}

const checkinEpic = (action$: Observable, { getState }) =>
  action$
    .ofType(types.CHECKIN_INIT)
    .debounceTime(500)
    .exhaustMap(({ payload }: CheckinProps) => {
      if (getCookie('access_token') === '') {
        return Observable.of(checkinFail([{ status: 401 }]));
      }
      return Observable.fromPromise(API.Checkin(payload))
        .mergeMap(res => {
          return Observable.of(
            checkinDone(res),
            fetchStatusInit(),
            snackbar.show({
              message: 'You are now checked in',
              handleAction: () => window.location.assign('/'),
              action: 'See menu'
            })
          );
        })
        .catch(error => Observable.of(checkinFail(error)))
    });

type FavProps = {
  payload: {
    id: string,
    fav: boolean,
  }
}
const favEpic = (action$: Observable) =>
  action$
    .ofType(types.FAV_RESTAURANT_INIT)
    .debounceTime(500)
    .exhaustMap(({ payload }: FavProps) => {
      return Observable.fromPromise(API.FavRestaurant(payload))
        .map(res => favRestaurantDone({res, prePayload: payload }))
        .catch(error => Observable.of(favRestaurantFail({error, prePayload: payload })))
    });


export default [
  checkinEpic,
  favEpic
];
