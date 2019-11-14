import { createSelector } from 'reselect';
import filter from 'ramda/es/filter';
import propEq from 'ramda/es/propEq';
import values from 'ramda/es/values';
import { MenuItem, MenuItemTranslation } from 'MenuItemsModels';
import { RootState } from 'typesafe-actions';
import { useSelector } from 'react-redux';
import { useIntl } from '@dinify/common/src/lib/i18n';

export const getItemsOfCategory = createSelector<any, any, any, any, any>(
  [(state, categoryId) => categoryId, state => state.menuItem.all],
  (categoryId, itemsMap) => {
    return filter(propEq('menu_category_id', categoryId), values(itemsMap));
  },
);

type MenuItemView = MenuItem & MenuItemTranslation;

export const useMenuItemView = (menuItemId: string | null) => {
  const locale = useIntl(ctx => ctx.state.locale);
  const selectTranslation = (
    translations: [MenuItemTranslation],
  ): MenuItemTranslation => {
    if (locale)
      return (
        translations.find(t => t.locale === locale.tag.language()) ||
        translations[0]
      );
    else return translations[0];
  };
  return useSelector<RootState, MenuItemView | null>(state => {
    if (menuItemId) {
      const selected = state.menuItem.all[menuItemId];
      if (selected) {
        // Assuming Accecpt-Language header was set on the request
        return { ...selectTranslation(selected.translations), ...selected };
      }
    }
    return null;
  });
};
