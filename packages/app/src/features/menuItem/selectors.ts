import { createSelector } from 'reselect';
import filter from 'ramda/es/filter';
import propEq from 'ramda/es/propEq';
import values from 'ramda/es/values';
import { MenuItem, MenuItemTranslation } from 'MenuItemsModels';
import { RootState } from 'typesafe-actions';
import { useSelector } from 'react-redux';
import { useIntl, localeMatcher } from '@dinify/common/src/lib/i18n';
import { Locale } from '@phensley/cldr';
import { Translation } from 'CartModels';

export const getItemsOfCategory = createSelector<any, any, any, any, any>(
  [(_, categoryId) => categoryId, state => state.menuItem.all],
  (categoryId, itemsMap) => {
    return filter(propEq('menu_category_id', categoryId), values(itemsMap));
  },
);

export const selectTranslation = <T extends Translation>(
  locale: Locale,
  translations: [T],
): T => {
  if (locale) {
    return (
      translations.find(t => {
        return localeMatcher.match(t.locale).locale.id === locale.id
      }) || translations[0]
    );
  }
  else return translations[0];
};

export type MenuItemView = MenuItem & MenuItemTranslation;

export const useMenuItemView = (menuItemId: string): MenuItemView => {
  const locale = useIntl(ctx => ctx.state.locale);

  return useSelector<RootState, MenuItemView>(state => (
    { ...selectTranslation(locale, state.menuItem.all[menuItemId].translations), ...state.menuItem.all[menuItemId] }
  ));
};
