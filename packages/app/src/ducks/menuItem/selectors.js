import { createSelector } from 'reselect'
import R from 'ramda'
import * as FN from '@dinify/common/dist/lib/FN';

export const getItemsOfCategory = createSelector(
  [
    (state, categoryId) => categoryId,
    (state) => state.menuItem.all,
  ],
  (categoryId, itemsMap) => {
    return R.filter(R.propEq('menu_category_id', categoryId), FN.MapToList(itemsMap));
  }
)
