import R from 'ramda'

const initialState = {
  all: {}
}

export default function reducer(state = initialState, action) {
  switch (action.type) {

    case 'FETCH_USER_DONE': {
      const payload = action.payload.res
      return R.assocPath(['all', payload.id], payload)(state);
    }

    default:
      return state;
  }
}
