import { combineEpics } from 'redux-observable';
import { epics as crud } from 'ducks/crudEpics';
import { authEpics as auth } from 'ducks/auth';
import { restaurantEpics as restaurant } from 'ducks/restaurant';
import { userEpics as user } from 'ducks/user';
import appEpics from 'ducks/appEpics';

const epics = [
  ...crud,
  ...appEpics,
  ...auth,
  ...user,
  ...restaurant,
];

export default (deps = {}, platformEpics = []) => (
  action$,
  { getState, dispatch },
) =>
  combineEpics(...epics, ...platformEpics)(action$, {
    ...deps,
    getState,
    dispatch,
  });
