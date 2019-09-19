import assoc from 'ramda/es/assoc';
import assocPath from 'ramda/es/assocPath';
import mapObjIndexed from 'ramda/es/mapObjIndexed';
import { actionTypes as firebaseTypes } from 'react-redux-firebase';
import { ListToMap } from '@dinify/common/dist/lib/FN';

const initialState = {
  all: {},
  selectedLocale: null
};

export default function reducer(state = initialState, action) {
  const { payload, type } = action;
  switch (type) {

    case 'FETCH_TRANSLATIONS_DONE': {
      const { res } = payload;
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
      const { locale } = payload;
      return assocPath(['all', locale], {})(state);
    }

    case 'SELECT_LOCALE': {
      const { selectedLocale } = payload;
      return assoc('selectedLocale', selectedLocale)(state);
    }

    case 'SAVE_TRANSLATION_DONE': {
      const { id, locale, type, description, name } = payload.initPayload;
      const updObj = { id, type };
      if (description) updObj.description = description;
      if (name) updObj.name = name;
      const newState = state;
      if (!newState.all[locale]) newState.all[locale] = {};
      const newTranslation = { ...newState.all[locale][id], ...updObj };
      return assocPath(['all', locale, id], newTranslation)(newState);
    }

    case firebaseTypes.LOGOUT: {
      return initialState;
    }

    default:
      return state;
  }
}
