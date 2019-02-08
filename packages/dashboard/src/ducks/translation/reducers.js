// @flow
import R from 'ramda';
import { ListToMap } from 'lib/FN';

const initialState = {
  all: {},
};

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case 'FETCH_TRANSLATIONS_DONE': {
      const res = action.payload.res;
      console.log(res);
      const all = R.mapObjIndexed((val) => {
        return ListToMap(val);
      }, res);
      return R.assoc('all', all)(state);
    }

    default:
      return state;
  }
}
