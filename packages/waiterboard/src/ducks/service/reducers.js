import assoc from 'ramda/es/assoc';
import filter from 'ramda/es/filter';
import { ListToMap } from '@dinify/common/src/lib/FN';

const initialState = {
  all: {}
};

export default function reducer(state = initialState, action) {
  switch (action.type) {

    case 'GET_SERVICES_DONE': {
      const list = action.payload;
      return assoc('all', ListToMap(list))(state);
    }

    default:
      return state;
  }
}
