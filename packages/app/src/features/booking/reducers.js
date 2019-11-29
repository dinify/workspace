import assoc from 'ramda/es/assoc';

const initialState = {
  time: null,
  guests: null,
  date: new Date(),
};

export default function reducer(state = initialState, action) {
  const { payload } = action;
  switch (action.type) {
    case 'booking/SET_TIME': {
      return assoc('time', payload)(state);
    }
    case 'booking/SET_GUESTS': {
      return assoc('guests', payload)(state);
    }
    case 'booking/SET_DATE': {
      return assoc('date', payload)(state);
    }
    default:
      return state;
  }
}
