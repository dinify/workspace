// @flow
import { Observable } from 'rxjs';
import * as API from 'api/restaurant';
import types from './types';
import { checkinFail, checkinDone } from './actions';

type CheckinProps = {
  payload: {
    qr?: string,
    code?: string,
  }
}

const checkinEpic = (action$: Observable) =>
  action$
    .ofType(types.CHECKIN_INIT)
    .switchMap(({ payload }: CheckinProps) =>
      Observable.fromPromise(API.Checkin(payload))
        .mergeMap(res => {
          return Observable.of(checkinDone(res));
        })
        .catch(error => Observable.of(checkinFail(error))),
    );

export default [checkinEpic];
