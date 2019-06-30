import { createSelector } from 'reselect'
import find from 'ramda/src/find';
import propEq from 'ramda/src/propEq';
import filter from 'ramda/src/filter';
import assoc from 'ramda/src/assoc';

import { MapToList } from '@dinify/common/dist/lib/FN';

export const getCategoriesBySubdomain = createSelector(
  [
    (state, subdomain) => subdomain,
    (state) => state.restaurant.all,
    (state) => state.menuCategory.all,
    (state) => state.menuItem.all,
  ],
  (subdomain, restaurantsMap, categoriesMap, itemsMap) => {
    const restaurant = find(propEq('subdomain', subdomain))(MapToList(restaurantsMap));
    if (restaurant) {
      return filter(propEq('restaurant_id', restaurant.id), MapToList(categoriesMap))
      .map((category) => {
        const items = filter(propEq('menu_category_id', category.id), MapToList(itemsMap));
        return assoc('items', items)(category);
      });
    }
    return [];
  }
)
