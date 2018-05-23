import { combineEpics } from 'redux-observable'
import { epics as restaurant } from 'ducks/restaurant'
import { tableEpics } from 'ducks/table'
import { epics as wild } from 'ducks/wildEpics'

import { bookingEpics } from 'ducks/booking'
import { callEpics } from 'ducks/call'

const epics = [
  ...restaurant,
  ...wild,
  ...bookingEpics,
  ...callEpics,
  ...tableEpics
]

export default (deps = {}, platformEpics = []) => (action$, { getState, dispatch }) =>
  combineEpics(...epics, ...platformEpics)(action$, { ...deps, getState, dispatch })
