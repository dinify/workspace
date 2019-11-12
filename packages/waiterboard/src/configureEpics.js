import { combineEpics } from 'redux-observable';
import { authEpics as auth } from '@dinify/common/src/ducks/auth';
import { epics as crud } from '@dinify/common/src/ducks/crudEpics';
import appEpics from 'features/app/epics.ts';
import commonEpics from 'features/common/epics';
import restaurantEpics from 'features/restaurant/epics.ts';
import tableEpics from 'features/table/epics';
import bookingEpics from 'features/booking/epics';
import callEpics from 'features/call/epics';
import orderEpics from 'features/order/epics';
import seatEpics from 'features/seat/epics';
import billEpics from 'features/bill/epics';
import serviceEpics from 'features/service/epics';

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
