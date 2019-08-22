import { of } from 'rxjs';
import { mergeMap } from 'rxjs/operators';
import { ofType } from 'redux-observable';
import { fetchRestaurantsAsync, fetchStatusAsync } from 'ducks/restaurant/actions.ts';
import { fetchCartInit, fetchCartFail } from 'ducks/cart/actions';
import { getCookie } from '@dinify/common/dist/lib/FN';
import { loadUserData as loadUserDataAction } from './actions';
import types from './types';

const bootstrapEpic = (action$) =>
  action$.pipe(
    ofType('persist/PERSIST'),
    mergeMap(() => of(fetchRestaurantsAsync.request(), loadUserDataAction()))
  );

const loadUserData = (action$) =>
  action$.pipe(
    ofType(types.LOAD_USER_DATA),
    mergeMap(() => {
      const callActions = []
      const token = getCookie('access_token');
      if (token && token.length > 1) {
        // seems like logged in, so let's find out
        callActions.push(fetchStatusAsync.request());
        callActions.push(fetchCartInit());
      } else {
        // no token means logged out, so make sure that there's no user data
        callActions.push(fetchStatusAsync.failure([{ status: 401 }]));
        callActions.push(fetchCartFail([{ status: 401 }]));
      }
      return callActions;
    })
  );

export default [
  bootstrapEpic,
  loadUserData
];
