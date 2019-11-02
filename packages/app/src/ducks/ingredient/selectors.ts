import { useSelector } from 'react-redux';
import { Ingredient, MenuIngredient } from 'IngredientModels';
import { Translation } from 'CartModels';
import { RootState } from 'typesafe-actions';
import { values } from 'ramda';

export type IngredientView = Ingredient &
  MenuIngredient &
  Translation & {
    excluded: boolean;
  };

export const useIngredientView = (menuItemId: string) => {
  return useSelector<RootState, IngredientView[]>(state =>
    values(state.menuItem.menuIngredients).map(value => {
      const ingredient = state.ingredient.all[value.ingredientId];
      const menuItemExcludes = state.menuItem.selectedExcludes[menuItemId];
      const excluded =
        menuItemExcludes && menuItemExcludes[value.ingredientId]
          ? menuItemExcludes[value.ingredientId]
          : false;
      return {
        ...value,
        ...ingredient,
        ...ingredient.translations[0],
        excluded,
      };
    }),
  );
};
