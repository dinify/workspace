import { useSelector } from 'react-redux';
import { Ingredient, MenuIngredient } from 'IngredientModels';
import { Translation } from 'CartModels';
import { RootState } from 'typesafe-actions';
import { values } from 'ramda';
import { Locale } from '@phensley/cldr';
import { useIntl } from '@dinify/common/src/lib/i18n';

export type IngredientView = Ingredient &
  MenuIngredient &
  Translation & {
    excluded: boolean;
  };

export const useIngredientView = (menuItemId: string) => {
  const locale: Locale | undefined = useIntl(ctx => ctx.state.locale);
  const selectTranslation = (translations: [Translation]): Translation => {
    if (locale)
      return (
        translations.find(t => t.locale === locale.tag.language()) ||
        translations[0]
      );
    else return translations[0];
  };
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
          ...selectTranslation(ingredient.translations),
          excluded,
        };
      }),
  );
};
