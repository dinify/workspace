import { createSelector } from 'reselect';
import pickBy from 'ramda/es/pickBy';
import pipe from 'ramda/es/pipe';
import sort from 'ramda/es/sort';
import { MapToList } from '@dinify/common/dist/lib/FN';
import { getT } from '@dinify/common/src/lib/translation.ts';

export const allServices = state => state.service.all;
export const selectedRestaurantId = state => state.restaurant.selectedRestaurant;

const locale = 'en';

export const selectedServicesList = createSelector(
  allServices,
  selectedRestaurantId,
  (all, id) => {
    if (!id) return [];
    return pipe(
      (col) => pickBy((s) => s.restaurantId === id, col),
      MapToList,
      (arr) => sort((a, b) => {
        const aName = getT(a.translations, locale);
        const bName = getT(b.translations, locale);
        if (!aName || !bName) return 1;
        return aName.localeCompare(bName);
      }, arr)
    )(all);
  }
);

