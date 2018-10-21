// @flow
import { Observable } from 'rxjs';
import { loadUserData as loadUserDataAction } from './actions';
import { fetchRestaurantsInit, fetchStatusInit, fetchStatusFail } from 'ducks/restaurant/actions';
import { fetchMeInit, fetchMeFail } from 'ducks/user/actions';
import { fetchCartInit, fetchCartFail } from 'ducks/cart/actions';
import { getCookie } from 'tabb-front/dist/lib/FN';
import types from './types';

const bootstrapEpic = (action$: Observable) =>
  action$
    .ofType('persist/REHYDRATE')
    .mergeMap(() => {
      const callActions = [
        fetchRestaurantsInit(),
        loadUserDataAction()
      ]
      return callActions;
    });

const loadUserData = (action$: Observable) =>
  action$
    .ofType(types.LOAD_USER_DATA)
    .mergeMap(() => {
      const callActions = []
      const token = getCookie('access_token');
      if (token && token.length > 1) {
        // seems like logged in, so let's find out
        callActions.push(fetchMeInit());
        callActions.push(fetchStatusInit());
        callActions.push(fetchCartInit());
      } else {
        // no token means logged out, so make sure that there's no user data
        callActions.push(fetchMeFail([{ status: 401 }]));
        callActions.push(fetchStatusFail([{ status: 401 }]));
        callActions.push(fetchCartFail([{ status: 401 }]));
      }
      return callActions;
    });

export default [
  bootstrapEpic,
  loadUserData
];
