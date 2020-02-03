import { createModel } from '@rematch/core';
import assoc from 'ramda/es/assoc';
import pipe from 'ramda/es/pipe';
import groupBy from 'ramda/es/groupBy';
import map from 'ramda/es/map';

import * as API from '@dinify/common/src/api/v2/restaurant';

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
    }
  },

  effects: {

    async fetchTranslations(payload, rootState) {
      const restaurantId = rootState.restaurant.selectedRestaurant;
      const res = await API.GetTranslationsOfRestaurant({ restaurantId });
      this.setAll(res);
    },

  },
});
