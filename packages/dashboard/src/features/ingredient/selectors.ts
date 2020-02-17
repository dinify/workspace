import { createSelector } from 'reselect';
import { MapToList, sortByName, getNameOfItem } from '@dinify/common/src/lib/FN';
import find from 'ramda/es/find';

export const allIngredients = (state: any) => state.ingredient.all;

export const listOfIngredients = createSelector(
  allIngredients,
  (all) => {
    return MapToList(all).sort(sortByName);
  }
);

export const findIngredientByName = createSelector(
  [
    listOfIngredients,
    (state: any, prop: any) => prop
  ],
  (list, lookingFor) => {
    return find((one: any) =>
      getNameOfItem(one).toLowerCase() === lookingFor.toLowerCase()
    )(list);
  }
);
