import { createSelector } from 'reselect';
import { MapToList, sortByName } from '@dinify/common/src/lib/FN';

export const allIngredients = state => state.ingredient.all;

export const listOfIngredients = createSelector(
  allIngredients,
  (all) => {
    return MapToList(all).sort(sortByName);
  }
);
