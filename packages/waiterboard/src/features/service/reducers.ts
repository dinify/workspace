import assoc from 'ramda/es/assoc';
import { ListToMap } from '@dinify/common/src/lib/FN';
import { getType } from 'typesafe-actions';
import { fetchServicesAsync } from './actions';

const initialState = {
  all: {}
};

export default function reducer(state = initialState, action: any) {
  switch (action.type) {

    case getType(fetchServicesAsync.success): {
      const list = action.payload;
      return assoc('all', ListToMap(list))(state);
    }

    default:
      return state;
  }
}
