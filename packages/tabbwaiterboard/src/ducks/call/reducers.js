import R from 'ramda'
import { UpdateOriginal } from 'lib/FN'

const initialState = {
  all: {}
}

export default function reducer(state = initialState, action) {
  switch (action.type) {

    case 'LOAD_CALL_DONE': {
      const payload = action.payload.res
      return R.assoc('all', UpdateOriginal(state.all, payload))(state)
    }

    case 'CONFIRM_CALL_INIT': {
      const { id } = action.payload
      return R.assocPath(['all', id, 'status'], 'CONFIRMED')(state)
    }

    default:
      return state;
  }
}
