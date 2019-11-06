import { createSelector } from 'reselect';
import pickBy from 'ramda/es/pickBy';
import pipe from 'ramda/es/pipe';
import sort from 'ramda/es/sort';
import { MapToList } from '@dinify/common/src/lib/FN';

export const allCategories = state => state.menuCategory.all;
export const selectedRestaurantId = state => state.restaurant.selectedRestaurant;

export const relevantCategoriesList = createSelector(
  [
    allCategories,
    selectedRestaurantId
  ],
  (all, id) => {
    if (!id) return [];
    return pipe(
      (col) => pickBy((s) => s.restaurantId === id, col),
      MapToList,
      (arr) => sort((a, b) => a.precedence - b.precedence, arr)
    )(all);
  }
);
