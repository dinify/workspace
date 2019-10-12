import { createSelector } from 'reselect';
import { MapToList } from '@dinify/common/dist/lib/FN';

export const allIngredients = state => state.ingredient.all;

export const listOfIngredients = createSelector(
  allIngredients,
  (all) => {
    return MapToList(all).sort((a, b) =>
      a.id.localeCompare(b.id),
    );
  }
);
