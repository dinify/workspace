// @flow
import { Observable } from 'rxjs';
import * as API from 'api/restaurant';
import types from './types';
import { checkinFail, checkinDone, favRestaurantDone, favRestaurantFail } from './actions';

type CheckinProps = {
  payload: {
    qr?: string,
    code?: string,
  }
}

const checkinEpic = (action$: Observable, { getState }) =>
  action$
    .ofType(types.CHECKIN_INIT)
    .switchMap(({ payload }: CheckinProps) => {
      if (!getState().user.loggedUserId) {
        return Observable.of(checkinFail([{ status: 401 }]));
      }
      return Observable.fromPromise(API.Checkin(payload))
        .mergeMap(res => {
          return Observable.of(checkinDone(res));
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
    .switchMap(({ payload }: FavProps) => {
      return Observable.fromPromise(API.FavRestaurant(payload))
        .mergeMap(res => {
          return Observable.of(favRestaurantDone(res));
        })
        .catch(error => Observable.of(favRestaurantFail(error)))
    });


export default [
  checkinEpic,
  favEpic
];
