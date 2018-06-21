// @flow
import { Observable } from 'rxjs';
import { fetchRestaurantsInit, fetchStatusInit, fetchStatusFail } from 'ducks/restaurant/actions';
import { fetchMeInit, fetchMeFail } from 'ducks/user/actions';
import { getCookie } from 'lib/FN';

const bootstrapEpic = (action$: Observable) =>
  action$
    .ofType('persist/REHYDRATE')
    .mergeMap(() => {
      const callActions = [
        fetchRestaurantsInit(),
      ]
      const token = getCookie('access_token');
      if (token && token.length > 1) {
        // seems like logged in, so let's find out
        callActions.push(fetchMeInit());
        callActions.push(fetchStatusInit());
      } else {
        // no token means logged out, so make sure that there's no user data
        callActions.push(fetchMeFail([{ status: 401 }]));
        callActions.push(fetchStatusFail([{ status: 401 }]));
      }
      return callActions;
    });

export default [bootstrapEpic];
