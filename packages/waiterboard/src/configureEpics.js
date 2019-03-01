import { combineEpics } from 'redux-observable'
import { epics as restaurant } from './ducks/restaurant'
import { tableEpics } from './ducks/table'
import wild from './ducks/wildEpics'
import { bookingEpics } from './ducks/booking'
import { callEpics } from './ducks/call'
import { orderEpics } from './ducks/order'
import { seatEpics } from './ducks/seat'
import { billEpics } from './ducks/bill'
import { authEpics as auth } from '@dinify/common/dist/ducks/auth';
import { getFirebase } from 'react-redux-firebase';


const rootEpic = (action$, state$, ...rest) => {
  const epic = combineEpics(
    ...auth,
    ...restaurant,
    ...wild,
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
    { getFirebase },
    ...rest
  );
  return output;
};

export default rootEpic;
