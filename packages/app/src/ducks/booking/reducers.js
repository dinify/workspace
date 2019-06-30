import assoc from 'ramda/src/assoc';
import types from './types';

const initialState = {
  time: null,
  guests: null,
  date: new Date(),
};

export default function reducer(state = initialState, action) {
  const { payload } = action;
  switch (action.type) {
    case types.SET_TIME: {
      return assoc('time', payload)(state);
    }
    case types.SET_GUESTS: {
      return assoc('guests', payload)(state);
    }
    case types.SET_DATE: {
      return assoc('date', payload)(state);
    }
    default:
      return state;
  }
}
