import R from 'ramda'
import types from './types'

const initialState = {
  all: {},
  loggedUserId: null,
}

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case types.FETCH_ME_DONE: {
      const user = action.payload.res
      return R.assoc('loggedUserId', user.id)(R.assocPath(['all', user.id], user)(state))
    }
    default:
      return state
  }
}
