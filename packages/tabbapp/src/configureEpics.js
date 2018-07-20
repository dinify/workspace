import { combineEpics } from 'redux-observable';
import { epics as crud } from 'ducks/crudEpics';
import { authEpics as auth } from 'ducks/auth';
import { restaurantEpics as restaurant } from 'ducks/restaurant';
import { userEpics as user } from 'ducks/user';
import { menuItemEpics as menuItem } from 'ducks/menuItem';
import { cartEpics as cart } from 'ducks/cart';
import { billEpics as bill } from 'ducks/bill'

import { appEpics as app } from 'ducks/app';

const epics = [
  ...app,
  ...crud,
  ...auth,
  ...user,
  ...restaurant,
  ...menuItem,
  ...cart,
  ...bill,
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
