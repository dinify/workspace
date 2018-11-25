import { combineEpics } from 'redux-observable'
import { epics as restaurant } from './ducks/restaurant'
import { tableEpics } from './ducks/table'
import wild from './ducks/wildEpics'
import { bookingEpics } from './ducks/booking'
import { callEpics } from './ducks/call'
import { orderEpics } from './ducks/order'
import { seatEpics } from './ducks/seat'


const epics = [
  ...restaurant,
  ...wild,
  ...bookingEpics,
  ...callEpics,
  ...tableEpics,
  ...orderEpics,
  ...seatEpics
]

export default (deps = {}, platformEpics = []) => (action$, { getState, dispatch }) =>
  combineEpics(...epics, ...platformEpics)(action$, { ...deps, getState, dispatch })
