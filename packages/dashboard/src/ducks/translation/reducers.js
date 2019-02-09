// @flow
import R from 'ramda';
import { ListToMap } from 'lib/FN';

const initialState = {
  all: {},
  selectedLocale: null
};

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case 'FETCH_TRANSLATIONS_DONE': {
      const res = action.payload.res;
      const all = R.mapObjIndexed((val) => {
        return ListToMap(val);
      }, res);
      if (!state.selectedLocale) state = R.assoc('selectedLocale', Object.keys(all)[0])(state);
      return R.assoc('all', all)(state);
    }
    case 'ADD_LOCALE': {
      const locale = action.payload.locale;
      return R.assocPath(['all', locale], {})(state);
    }
    case 'SELECT_LOCALE': {
      const selectedLocale = action.payload.selectedLocale;
      return R.assoc('selectedLocale', selectedLocale)(state);
    }
    default:
      return state;
  }
}
