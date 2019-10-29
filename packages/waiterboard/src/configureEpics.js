import { combineEpics } from 'redux-observable';
import { authEpics as auth } from '@dinify/common/src/ducks/auth';
import { appEpics } from 'ducks/app';
import { commonEpics } from 'ducks/common';
import { epics as crud } from '@dinify/common/src/ducks/crudEpics';
import { restaurantEpics } from 'ducks/restaurant';
import { tableEpics } from 'ducks/table';
import { bookingEpics } from 'ducks/booking';
import { callEpics } from 'ducks/call';
import { orderEpics } from 'ducks/order';
import { seatEpics } from 'ducks/seat';
import { billEpics } from 'ducks/bill';
import serviceEpics from 'ducks/service/epics';

const rootEpic = (action$, state$, firebase, ...rest) => {
  const epic = combineEpics(
    ...auth,
    ...appEpics,
    ...commonEpics,
    ...crud,
    ...restaurantEpics,
    ...bookingEpics,
    ...callEpics,
    ...tableEpics,
    ...orderEpics,
    ...seatEpics,
    ...serviceEpics,
    ...billEpics
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
