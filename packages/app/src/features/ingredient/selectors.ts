import { useSelector } from 'react-redux';
import { Ingredient, MenuIngredient } from 'IngredientModels';
import { Translation, OrderItemN } from 'CartModels';
import { RootState } from 'typesafe-actions';
import { values } from 'ramda';
import { useIntl } from '@dinify/common/src/lib/i18n';
import { selectTranslation } from '../menuItem/selectors';

export type IngredientView = Ingredient &
  MenuIngredient &
  Translation & {
    excluded: boolean;
  };

export const useIngredientOrderView = (orderItemId: string): IngredientView[] => {
  const locale = useIntl(ctx => ctx.state.locale);
  const orderItem = useSelector<RootState, OrderItemN>(state => state.cart.items[orderItemId]);
  return useSelector<RootState, IngredientView[]>(state =>
    orderItem.orderExcludes
      .filter(i => !!i)
      .map((ingredientId: string) => {
        const ingredient = state.ingredient.all[ingredientId];
        const menuIngredient = values(state.menuItem.menuIngredients)
          .find(item => item.menuItemId === orderItem.menuItemId) as MenuIngredient;
        return {
          ...menuIngredient,
          ...ingredient,
          ...selectTranslation(locale, ingredient.translations),
          excluded: true,
        };
      })
  );
};

export const useIngredientView = (menuItemId: string) => {
  const locale = useIntl(ctx => ctx.state.locale);
  return useSelector<RootState, IngredientView[]>(state =>
    values(state.menuItem.menuIngredients)
      .filter(item => item.menuItemId === menuItemId)
      .map(value => {
        const ingredient = state.ingredient.all[value.ingredientId];
        const menuItemExcludes = state.menuItem.selectedExcludes[menuItemId];
        const excluded =
          menuItemExcludes && menuItemExcludes[value.ingredientId]
            ? menuItemExcludes[value.ingredientId]
            : false;
        return {
          ...value,
          ...ingredient,
          ...selectTranslation(locale, ingredient.translations),
          excluded,
        };
      }),
  );
};
