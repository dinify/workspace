import R from 'ramda'
import { UpdateOriginal } from 'lib/FN'

const initialState = {
  list: []
}

export default function reducer(state = initialState, action) {
  switch (action.type) {

    case 'GET_BILLS_DONE': {
      const payload = action.payload;
      return R.assoc('list', payload)(state);
    }

    default:
      return state;
  }
}
