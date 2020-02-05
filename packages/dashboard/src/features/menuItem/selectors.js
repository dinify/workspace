import { createSelector } from 'reselect';
import { MapToList } from '@dinify/common/src/lib/FN';
import filter from 'ramda/es/filter';

export const getMenuItems = state => state.all;

const getSelectedCategoryId = (state, props) => props.selectedCategoryId;

export const selectedMenuItems = createSelector(
  [
    getMenuItems,
    getSelectedCategoryId
  ],
  (menuItems, id) => {
    if (!id) return [];
    return filter(
      item => item.menuCategoryId === id,
      MapToList(menuItems),
    ).sort((a, b) => a.precedence - b.precedence);
  }
);


