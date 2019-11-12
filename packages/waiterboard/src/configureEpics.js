import { combineEpics } from 'redux-observable';
import { authEpics as auth } from '@dinify/common/src/features/auth';
import appEpics from 'features/app/epics';
import commonEpics from 'features/common/epics';
import restaurantEpics from 'features/restaurant/epics';
import tableEpics from 'features/table/epics';
import bookingEpics from 'features/booking/epics';
import callEpics from 'features/call/epics';
import orderEpics from 'features/order/epics';
import seatEpics from 'features/seat/epics';
import billEpics from 'features/bill/epics';
import userEpics from 'features/user/epics';
import serviceEpics from 'features/service/epics';

const rootEpic = (action$, state$, firebase, ...rest) => {
  const epic = combineEpics(
    ...auth,
    ...appEpics,
    ...commonEpics,
    ...restaurantEpics,
    ...bookingEpics,
    ...callEpics,
    ...tableEpics,
    ...orderEpics,
    ...seatEpics,
    ...serviceEpics,
    ...billEpics,
    ...userEpics
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
