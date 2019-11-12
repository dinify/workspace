import { createSelector } from 'reselect';
import filter from 'ramda/es/filter';
import propEq from 'ramda/es/propEq';
import values from 'ramda/es/values';
// import { RootState } from 'typesafe-actions';

export const getItemsOfCategory = createSelector<any, any, any, any, any>(
  [(state, categoryId) => categoryId, state => state.menuItem.all],
  (categoryId, itemsMap) => {
    return filter(propEq('menu_category_id', categoryId), values(itemsMap));
  },
);
