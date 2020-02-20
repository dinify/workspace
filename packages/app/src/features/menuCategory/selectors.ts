import { createSelector } from 'reselect';
import { RootState } from 'typesafe-actions';
import { MenuCategory } from 'MenuCategoriesModels';
import { Translation } from 'CartModels';
import { useIntl } from '@dinify/common/src/lib/i18n';
import { useSelector } from 'react-redux';
import { selectTranslation } from '../menuItem/selectors';
import values from 'ramda/es/values';

export const getCategoriesBySubdomain = createSelector(
  [
    (_: RootState, subdomain: string) => subdomain,
    (state) => state.menuCategory.all,
    (state) => state.menuItem.all,
  ],
  (subdomain, categoriesMap, _) => {
    return values(categoriesMap)
      .filter((c) => c.subdomain === subdomain)
      .filter(c => c.published)
      .filter(c => c.items.length > 0)
      .sort((a, b) => a.precedence - b.precedence)
      .map(c => c.id);
  }
);

export type MenuCategoryView = MenuCategory & Translation;

export const useMenuCategoryView = (id: string): MenuCategoryView => {
  const locale = useIntl(ctx => ctx.state.locale);

  return useSelector<RootState, MenuCategoryView>(state => {
    const menuCategory = state.menuCategory.all[id];
    const items = menuCategory.items
      .map(idx => state.menuItem.all[idx])
      .sort((a, b) => a.precedence - b.precedence)
      .map(c => c.id);
    return {
      ...selectTranslation(locale, state.menuCategory.all[id].translations),
      ...menuCategory,
      items
    }
  });
};
