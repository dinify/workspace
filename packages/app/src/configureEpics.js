import { combineEpics } from 'redux-observable';

import { epics as crud } from '@dinify/common/dist/ducks/crudEpics';
import { authEpics as auth } from '@dinify/common/dist/ducks/auth';
import restaurant from 'ducks/restaurant/epics.ts';
import { userEpics as user } from 'ducks/user';
import { menuItemEpics as menuItem } from 'ducks/menuItem';
import cart from 'ducks/cart/epics.ts';
import { billEpics as bill } from 'ducks/bill';
import { seatEpics as seat } from 'ducks/seat';
import { uiEpics as ui } from 'ducks/ui';
import { serviceEpics as service } from 'ducks/service';

import language from 'ducks/auth/epics';

import { appEpics as app } from 'ducks/app';

// const combineEpics = (...epics) => (...args) =>
//  most.merge(
//    ...epics.map(epic => epic(...args))
//  );

const rootEpic = (action$, state$, firebase, ...rest) => {
  const epic = combineEpics(
    ...app,
    ...crud,
    ...auth,
    ...language,
    ...user,
    ...restaurant,
    ...menuItem,
    ...cart,
    ...bill,
    ...seat,
    ...ui,
    ...service
  );
  const output = epic(
    action$,
    state$,
    { firebase },
    ...rest
  );
  return output;
};

export default rootEpic;
