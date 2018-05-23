import R from 'ramda'
import { UpdateOriginal } from 'lib/FN'

const initialState = {
  all: {}
}

// Reducer
export default function reducer(state: State = initialState, action: Action) {
  switch (action.type) {

    case 'LOGGED_FETCHED_DONE': {
      const restaurant = action.payload
      const waiterboards = restaurant.waiterboards
      const selectedWBid = R.keys(waiterboards)[0]
      const wb = waiterboards[selectedWBid]
      return R.assoc('all', wb.tables)(state)
    }

    case 'UPDATE_TABLE_INIT': {
      const payload = action.payload
      const id = payload.id
      const newTable = R.merge(state.all[id], payload)
      return R.assocPath(['all', id], newTable)(state)
    }

    default:
      return state;
  }
}
