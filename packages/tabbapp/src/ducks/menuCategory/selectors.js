import { createSelector } from 'reselect'
import R from 'ramda'
import * as FN from 'lib/FN';

export const getCategoriesOfRestaurant = createSelector(
  [
    (state, ownProps) => {
      return ownProps.match.params.id
    } ,
    (state) => state.menuCategory.all
  ],
  (id, categoriesList) => R.filter(R.propEq('restaurant_id', id), FN.MapToList(categoriesList))
)
