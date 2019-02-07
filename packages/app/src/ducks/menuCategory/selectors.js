import { createSelector } from 'reselect'
import R from 'ramda'
import * as FN from 'tabb-front/dist/lib/FN';

export const getCategoriesBySubdomain = createSelector(
  [
    (state, subdomain) => subdomain,
    (state) => state.restaurant.all,
    (state) => state.menuCategory.all,
    (state) => state.menuItem.all,
  ],
  (subdomain, restaurantsMap, categoriesMap, itemsMap) => {
    const restaurant = R.find(R.propEq('subdomain', subdomain))(FN.MapToList(restaurantsMap));
    if (restaurant) {
      return R.filter(R.propEq('restaurant_id', restaurant.id), FN.MapToList(categoriesMap))
      .map((category) => {
        const items = R.filter(R.propEq('menu_category_id', category.id), FN.MapToList(itemsMap));
        return R.assoc('items', items)(category);
      });
    }
    return [];
  }
)
