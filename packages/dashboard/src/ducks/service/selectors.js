import { createSelector } from 'reselect';
import pickBy from 'ramda/src/pickBy';
import pipe from 'ramda/src/pipe';
import sort from 'ramda/src/sort';
import { MapToList } from '@dinify/common/dist/lib/FN';

export const allServices = state => state.service.all;
export const selectedRestaurantId = state => state.restaurant.selectedRestaurant;

export const selectedServicesList = createSelector(
  allServices,
  selectedRestaurantId,
  (all, id) => {
    if (!id) return [];
    return pipe(
      (col) => pickBy((s) => s.restaurant_id === id, col),
      MapToList,
      (arr) => sort((a, b) => a.name.localeCompare(b.name), arr)
    )(all);
  }
);

