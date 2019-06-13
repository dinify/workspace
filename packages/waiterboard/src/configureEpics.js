import { combineEpics } from 'redux-observable';
import { authEpics as auth } from '@dinify/common/dist/ducks/auth';
import { epics as crud } from '@dinify/common/dist/ducks/crudEpics';
import { restaurantEpics } from 'ducks/restaurant';
import { tableEpics } from 'ducks/table';
import { bookingEpics } from 'ducks/booking';
import { callEpics } from 'ducks/call';
import { orderEpics } from 'ducks/order';
import { seatEpics } from 'ducks/seat';
import { billEpics } from 'ducks/bill';

const rootEpic = (action$, state$, firebase, ...rest) => {
  const epic = combineEpics(
    ...auth,
    ...crud,
    ...restaurantEpics,
    ...bookingEpics,
    ...callEpics,
    ...tableEpics,
    ...orderEpics,
    ...seatEpics,
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
