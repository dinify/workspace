import { createSelector } from 'reselect';
import { MapToList, getNameOfItem } from '@dinify/common/src/lib/FN';
import filter from 'ramda/es/filter';
import find from 'ramda/es/find';
import { relevantCategoriesList } from '../menuCategory/selectors';

export const getMenuItems = (state: any) => state.all;

const getSelectedCategoryId = (state: any, props: any) => props.selectedCategoryId;

export const selectedMenuItems = createSelector(
  [
    getMenuItems,
    getSelectedCategoryId
  ],
  (menuItems, id) => {
    if (!id) return [];
    return filter(
      (item: any) => item.menuCategoryId === id,
      MapToList(menuItems),
    ).sort((a, b) => a.precedence - b.precedence);
  }
);

// list of menu items of selected restaurant through menu categories
export const listOfMenuItems = createSelector(
  [
    (state) => state.menuItem.all,
    relevantCategoriesList
  ],
  (menuItems, menuCategoriesList) => {

    const menuCategoriesIds = menuCategoriesList.map((c: any) => c.id);

    return filter(
      (item: any) => menuCategoriesIds.includes(item.menuCategoryId),
      MapToList(menuItems),
    );
  }
);

export const findMenuItemByName = createSelector(
  [
    listOfMenuItems,
    (state: any, prop: any) => prop.name,
    (state: any, prop: any) => prop.menuCategoryId
  ],
  (list, name, menuCategoryId) => {
    return find((one: any) =>
      getNameOfItem(one).toLowerCase() === name.toLowerCase()
      && one.menuCategoryId === menuCategoryId
    )(list);
  }
);
