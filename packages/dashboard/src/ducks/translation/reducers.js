import assoc from 'ramda/src/assoc';
import assocPath from 'ramda/src/assocPath';
import mapObjIndexed from 'ramda/src/mapObjIndexed';

import { ListToMap } from '@dinify/common/dist/lib/FN';

const initialState = {
  all: {},
  selectedLocale: null
};

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case 'FETCH_TRANSLATIONS_DONE': {
      const res = action.payload.res;
      const all = mapObjIndexed((val) => {
        return ListToMap(val);
      }, res);
      let newState = state;
      if (!state.selectedLocale) {
        newState = assoc('selectedLocale', Object.keys(all)[0])(state);
      }
      return assoc('all', all)(newState);
    }
    case 'ADD_LOCALE': {
      const locale = action.payload.locale;
      return assocPath(['all', locale], {})(state);
    }
    case 'SELECT_LOCALE': {
      const selectedLocale = action.payload.selectedLocale;
      return assoc('selectedLocale', selectedLocale)(state);
    }
    case 'SAVE_TRANSLATION_DONE': {
      const { id, locale, type, description, name } = action.payload.prePayload;
      const updObj = { id, type };
      if (description) updObj.description = description;
      if (name) updObj.name = name;
      const newState = state;
      if (!newState.all[locale]) newState.all[locale] = {};
      const newTranslation = { ...newState.all[locale][id], ...updObj };
      return assocPath(['all', locale, id], newTranslation)(newState);
    }
    default:
      return state;
  }
}
