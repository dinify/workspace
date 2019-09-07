import { createSelector } from 'reselect';
import filter from 'ramda/src/filter';
import propEq from 'ramda/src/propEq';
import { MapToList } from '@dinify/common/dist/lib/FN';

export const getItemsOfCategory = createSelector(
  [
    (state, categoryId) => categoryId,
    (state) => state.menuItem.all,
  ],
  (categoryId, itemsMap) => {
    return filter(propEq('menu_category_id', categoryId), MapToList(itemsMap));
  }
)
