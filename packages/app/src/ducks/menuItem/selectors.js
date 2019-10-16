import { createSelector } from 'reselect';
import filter from 'ramda/es/filter';
import propEq from 'ramda/es/propEq';
import { MapToList } from '@dinify/common/src/lib/FN';

export const getItemsOfCategory = createSelector(
  [
    (state, categoryId) => categoryId,
    (state) => state.menuItem.all,
  ],
  (categoryId, itemsMap) => {
    return filter(propEq('menu_category_id', categoryId), MapToList(itemsMap));
  }
)
