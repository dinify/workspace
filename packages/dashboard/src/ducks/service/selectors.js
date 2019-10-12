import { createSelector } from 'reselect';
import pickBy from 'ramda/es/pickBy';
import pipe from 'ramda/es/pipe';
import sort from 'ramda/es/sort';
import { MapToList } from '@dinify/common/dist/lib/FN';
import { getT } from '@dinify/common/src/lib/translation.ts';

export const allServices = state => state.service.all;
export const selectedRestaurantId = state => state.restaurant.selectedRestaurant;
export const defaultLanguage = state => state.restaurant.defaultLanguage;

export const selectedServicesList = createSelector(
  [
    allServices,
    selectedRestaurantId,
    defaultLanguage
  ],
  (all, id, lang) => {
    if (!id) return [];
    return pipe(
      (col) => pickBy((s) => s.restaurantId === id, col),
      MapToList,
      (arr) => sort((a, b) => {
        const aName = getT(a.translations, lang);
        const bName = getT(b.translations, lang);
        if (!aName || !bName) return 1;
        return aName.localeCompare(bName);
      }, arr)
    )(all);
  }
);

