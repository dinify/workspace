// @flow
import R from 'ramda'

type State = {
  all: Object,
}

const initialState = {
  all: {},
  backup: {}
}

export default function reducer(state: State = initialState, action: Action) {
  switch (action.type) {

    case 'LOGGED_FETCHED_DONE': {
      const categories = action.payload.categories
      state = R.assoc('all', categories)(state)
      return state
    }

    case 'CREATE_MENUCATEGORY_DONE': {
      const newCategory = action.payload.res
      return R.assocPath(['all', newCategory.id], newCategory)(state)
    }

    case 'UPDATE_MENUCATEGORY_INIT': {
      const payload = action.payload
      const original = state.all[payload.id]
      return R.assocPath(['all', payload.id], {...original, ...payload})(state)
    }

    case 'REMOVE_MENUCATEGORY_INIT': {
      state = R.assocPath(['backup', action.payload.id], state.all[action.payload.id])(state)
      return R.dissocPath(['all', action.payload.id])(state)
    }

    case 'REMOVE_MENUCATEGORY_FAIL': {
      const id = action.payload.prePayload.id
      return R.assocPath(['all', id], state.backup[id])(state)
    }

    default:
      return state
  }
}
