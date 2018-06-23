import { createSelector } from 'reselect'
import R from 'ramda'
import * as FN from 'lib/FN';

export const getCategoriesOfRestaurant = createSelector(
  [
    (state, id) => id,
    (state) => state.menuCategory.all
  ],
  (id, categoriesList) => R.filter(R.propEq('restaurant_id', id), FN.MapToList(categoriesList))
)
