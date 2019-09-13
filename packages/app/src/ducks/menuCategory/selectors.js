import { createSelector } from 'reselect';

import { MapToList } from '@dinify/common/dist/lib/FN';

export const getCategoriesBySubdomain = createSelector(
  [
    (state, subdomain) => subdomain,
    (state) => state.menuCategory.all,
    (state) => state.menuItem.all,
  ],
  (subdomain, categoriesMap, menuItemsMap) => {

    return MapToList(categoriesMap)
      .filter((c) => c.subdomain === subdomain)
      .map((c) => {
        if (!c.items) return c;
        c.items = c.items.map((miId) => menuItemsMap[miId])
        return c;
      });

  }
);

