import { combineEpics } from 'redux-observable';

import { epics as crud } from 'ducks/crudEpics';
import { authEpics as auth } from 'ducks/auth';
import { restaurantEpics as restaurant } from 'ducks/restaurant';
import { userEpics as user } from 'ducks/user';
import { menuItemEpics as menuItem } from 'ducks/menuItem';
import { cartEpics as cart } from 'ducks/cart';
import { billEpics as bill } from 'ducks/bill';
import { seatEpics as seat } from 'ducks/seat';
import { uiEpics as ui } from 'ducks/ui';
import { serviceEpics as service } from 'ducks/service';
import { getFirebase } from 'react-redux-firebase'

import { appEpics as app } from 'ducks/app';

// const combineEpics = (...epics) => (...args) =>
//  most.merge(
//    ...epics.map(epic => epic(...args))
//  );

const rootEpic = (action$, state$, ...rest) => {
  const epic = combineEpics(
    ...app,
    ...crud,
    ...auth,
    ...user,
    ...restaurant,
    ...menuItem,
    ...cart,
    ...bill,
    ...seat,
    ...ui,
    ...service
  );
  // action$ and state$ are converted from Observables to Most.js streams
  const output = epic(
    action$,
    state$,
    { getFirebase },
    ...rest
  );

  // convert Most.js stream back to Observable
  return output;
};

export default rootEpic;
