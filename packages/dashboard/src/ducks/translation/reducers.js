// @flow
import * as R from 'ramda';
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
    case 'SAVE_TRANSLATION_DONE': {
      const { id, locale, type, description, name } = action.payload.prePayload;
      const updObj = { id, type };
      if (description) updObj.description = description;
      if (name) updObj.name = name;
      const newTranslation = R.merge(state.all[locale][id], updObj);
      return R.assocPath(['all', locale, id], newTranslation)(state);
    }
    default:
      return state;
  }
}
