import { createSelector } from 'reselect'
import R from 'ramda'
import * as FN from 'lib/FN';

export const getCategoriesBySubdomain = createSelector(
  [
    (state, subdomain) => subdomain,
    (state) => state.menuCategory.all,
    (state) => state.restaurant.all
  ],
  (subdomain, categoriesMap, restaurantsMap) => {
    const restaurant = R.find(R.propEq('subdomain', subdomain))(FN.MapToList(restaurantsMap));
    if (restaurant) {
      return R.filter(R.propEq('restaurant_id', restaurant.id), FN.MapToList(categoriesMap));
    }
    return [];
  }
)
