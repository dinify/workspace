
const initialState = {
  all: {}
}

export default function reducer(state = initialState, action) {
  switch (action.type) {

    case 'TOGGLE_FRAMES': {
      return state
    }

    default:
      return state;
  }
}
