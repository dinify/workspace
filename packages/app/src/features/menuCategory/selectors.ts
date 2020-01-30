import { createSelector } from 'reselect';
import { RootState } from 'typesafe-actions';
import { MenuCategory } from 'MenuCategoriesModels';
import { Translation } from 'CartModels';
import { useIntl } from '@dinify/common/src/lib/i18n';
import { useSelector } from 'react-redux';
import { selectTranslation } from '../menuItem/selectors';
import values from 'ramda/es/values';
import comparator from 'ramda/es/comparator';

export const getCategoriesBySubdomain = createSelector(
  [
    (state: RootState, subdomain: string) => subdomain,
    (state) => state.menuCategory.all,
    (state) => state.menuItem.all,
  ],
  (subdomain, categoriesMap, menuItemsMap) => {
    return values(categoriesMap)
      .filter((c) => c.subdomain === subdomain)
      .filter(c => c.published)
      .filter(c => c.items.length > 0)
      .sort(comparator((a, b) => a.precedence < b.precedence))
      .map(c => c.id);
  }
);

export type MenuCategoryView = MenuCategory & Translation;

export const useMenuCategoryView = (id: string): MenuCategoryView => {
  const locale = useIntl(ctx => ctx.state.locale);

  return useSelector<RootState, MenuCategoryView>(state => (
    { ...selectTranslation(locale, state.menuCategory.all[id].translations), ...state.menuCategory.all[id] }
  ));
};
