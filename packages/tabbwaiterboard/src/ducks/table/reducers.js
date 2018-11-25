import assoc from 'ramda/src/assoc'
import assocPath from 'ramda/src/assocPath'
import keys from 'ramda/src/keys'
import merge from 'ramda/src/merge'
import { UpdateOriginal } from 'lib/FN'

const initialState = {
  all: {}
}

// Reducer
export default function reducer(state = initialState, action) {
  switch (action.type) {

    case 'LOGGED_FETCHED_DONE': {
      const restaurant = action.payload
      const waiterboards = restaurant.waiterboards
      const selectedWBid = keys(waiterboards)[0]
      const wb = waiterboards[selectedWBid]
      return assoc('all', UpdateOriginal(state.all, wb.tables))(state)
    }

    case 'UPDATE_TABLE_INIT': {
      const payload = action.payload
      const id = payload.id
      const newTable = merge(state.all[id], payload)
      return assocPath(['all', id], newTable)(state)
    }

    default:
      return state;
  }
}
