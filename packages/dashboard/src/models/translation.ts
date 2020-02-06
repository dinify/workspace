import { createModel } from '@rematch/core';
import assoc from 'ramda/es/assoc';
import assocPath from 'ramda/es/assocPath';
import pipe from 'ramda/es/pipe';
import findIndex from 'ramda/es/findIndex';
import update from 'ramda/es/update';
import propEq from 'ramda/es/propEq';
import groupBy from 'ramda/es/groupBy';
import map from 'ramda/es/map';
import toPairs from 'ramda/es/toPairs';
import { snackbarActions as snackbar } from 'material-ui-snackbar-redux';

import * as API from '@dinify/common/src/api/v2/restaurant';
import { currentT as t } from '@dinify/common/src/lib/i18n/translations';

const initialState = {
  translations: {},
  langs: [],
  selectedLang: 'en',
  activeTab: 0
}

export type TranslationState = typeof initialState;

export default createModel({
  state: initialState,

  reducers: {
    setAll: (state: TranslationState, payload: any): any => {
      const langs = Object.keys(payload);

      const byLangByType = map((entries) => {
        return groupBy((x: any) => x.type)(entries)
      }, payload);
      
      return pipe(
        assoc('langs', langs),
        assoc('translations', byLangByType)
      )(state);
    },

    selectLang: (state: TranslationState, payload: any): any => {
      return assoc('selectedLang', payload)(state);
    },

    switchTab: (state: TranslationState, payload: any): any => {
      return assoc('activeTab', payload)(state);
    },

    setTranslation: (state: TranslationState, payload: any): any => {
      const { id, locale, type, name, description } = payload;
      let toBeUpdated: any = (state as any).translations[locale][type];
      const index = findIndex(propEq('id', id))(toBeUpdated);
      const updObj = { ...toBeUpdated[index] };
      if (name) updObj.name = name;
      if (description) updObj.description = description;
      toBeUpdated = update(index, updObj, toBeUpdated);
      return assocPath(['translations', locale, type], toBeUpdated)(state);
    }

  },

  effects: dispatch => ({

    async fetchTranslations(payload, rootState) {
      const restaurantId = rootState.restaurant.selectedRestaurant;
      const res = await API.GetTranslationsOfRestaurant({ restaurantId });
      this.setAll(res);
    },

    async updateTranslation(payload) {
      const res = await API.UpdateTranslation(payload);
      if (!res) console.log('fuck');
      this.setTranslation(payload);
      dispatch(snackbar.show({
        message: t('saved'),
      }));
    },

    async pushTranslations(payload, rootState) {
      const { changes, type, locale } = payload;
      const restaurantId = rootState.restaurant.selectedRestaurant;
      const etc = { type, locale, restaurantId };

      toPairs(changes).map(([key, val]) => {
        let id = key;
        if (id.includes('_description')) {
          id = id.replace('_description', '');
          const updObj: any = { description: val, id, ...etc };
          // if (changes[id]) { // if name was also changed TODO
          //   updObj.name = changes[id];
          // }
          return this.updateTranslation(updObj);
        }
        // otherwise just name
        this.updateTranslation({ name: val, id, ...etc });
      });
    }

  }),
});
