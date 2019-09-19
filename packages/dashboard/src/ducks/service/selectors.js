import { createSelector } from 'reselect';
import pickBy from 'ramda/es/pickBy';
import pipe from 'ramda/es/pipe';
import sort from 'ramda/es/sort';
import find from 'ramda/es/find';
import propEq from 'ramda/es/propEq';
import { MapToList } from '@dinify/common/dist/lib/FN';

const getName = (translations, l) => {
  const translation = find(propEq('locale', l))(translations);
  return translation.name;
}

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
        const aName = getName(a.translations, locale);
        const bName = getName(b.translations, locale);
        return aName.localeCompare(bName);
      }, arr)
    )(all);
  }
);

