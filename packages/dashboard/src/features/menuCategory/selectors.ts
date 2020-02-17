import { createSelector } from 'reselect';
import pickBy from 'ramda/es/pickBy';
import pipe from 'ramda/es/pipe';
import sort from 'ramda/es/sort';
import find from 'ramda/es/find';
import { MapToList, getNameOfItem } from '@dinify/common/src/lib/FN';

export const allCategories = (state: any) => state.menuCategory.all;
export const selectedRestaurantId = (state: any) => state.restaurant.selectedRestaurant;

export const relevantCategoriesList = createSelector(
  [
    allCategories,
    selectedRestaurantId
  ],
  (all: any, id: any) => {
    if (!id) return [];
    return pipe(
      (col: any) => pickBy((s: any) => s.restaurantId === id, col),
      (m: any) => MapToList(m),
      (arr: any) => sort((a: any, b: any) => a.precedence - b.precedence, arr)
    )(all);
  }
);

export const findMenuCategoryByName = createSelector(
  [
    relevantCategoriesList,
    (state: any, prop: any) => prop
  ],
  (list, lookingFor) => {
    return find((one: any) =>
      getNameOfItem(one).toLowerCase() === lookingFor.toLowerCase()
    )(list);
  }
);