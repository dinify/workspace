import assocPath from 'ramda/src/assocPath';

const initialState = {
  all: {}
}

export default function reducer(state = initialState, action) {
  switch (action.type) {

    case 'FETCH_USER_DONE': {
      const payload = action.payload.res;
      return assocPath(['all', payload.uid], payload)(state);
    }

    default:
      return state;
  }
}
