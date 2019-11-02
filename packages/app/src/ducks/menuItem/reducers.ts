import assocPath from 'ramda/es/assocPath';
import dissocPath from 'ramda/es/dissocPath';
// import { MapToList, useOldPropsIfNewNA } from '@dinify/common/src/lib/FN';
// import menuCategoryTypes from 'ducks/menuCategory/types';
import { getType } from 'typesafe-actions';
import * as cartActions from '../cart/actions';
import { fetchMenuItemAsync, clearCustomizationsAction } from './actions';

import * as menuCategoriesActions from '../menuCategory/actions';
import assoc from 'ramda/es/assoc';
import pipe from 'ramda/es/pipe';
import { MenuItemMap } from 'MenuItemsModels';
import { AnyAction } from 'redux';
import { MenuIngredient } from 'IngredientModels';
import { MenuAddon } from 'AddonModels';
import { MenuOption } from 'OptionModels';
// import * as FN from '@dinify/common/src/lib/FN';

export interface MenuItemState {
  all: MenuItemMap;
  menuAddons: { [key: string]: MenuAddon };
  menuIngredients: { [key: string]: MenuIngredient };
  menuOptions: { [key: string]: MenuOption };
  selectedAddons: {
    [menuItemId: string]: { [addonId: string]: { amount: number } };
  };
  selectedChoices: {
    [menuItemId: string]: {
      [optionId: string]: { [choiceId: string]: boolean };
    };
  };
  selectedExcludes: {
    [menuItemId: string]: { [ingredientId: string]: boolean };
  };
}

const initialState: MenuItemState = {
  all: {},
  menuAddons: {},
  menuIngredients: {},
  menuOptions: {},
  selectedAddons: {}, // {[menuItemId]: { [addonId]: { amount: 0 } }}
  selectedChoices: {},
  selectedExcludes: {},
};

// const keepProps = ['ingredients', 'addons', 'options', 'favorite'];

export default function reducer(
  state = initialState,
  action: AnyAction,
): MenuItemState {
  const { payload, type } = action;
  switch (type) {
    // case types.FETCH_MENUITEMS_DONE: {
    //   const items = action.payload.res;
    //   let newState = state;
    //   FN.MapToList(items).forEach(item => {
    //     if (item.published) newState = assocPath(['all', item.id], item)(newState);
    //   });
    //   return newState;
    // }
    // case types.FETCH_MENUITEM_DONE: {
    //   const item = payload.res || {};
    //   return assocPath(['all', item.id], useOldPropsIfNewNA(state.all[item.id], item, keepProps))(state);
    // }
    case getType(fetchMenuItemAsync.success): {
      const {
        menuItems,
        menuAddons,
        menuIngredients,
        menuOptions,
      } = action.payload.entities;
      return pipe(
        assoc('all', { ...state.all, ...menuItems }),
        assoc('menuAddons', { ...state.menuAddons, ...menuAddons }),
        assoc('menuIngredients', {
          ...state.menuIngredients,
          ...menuIngredients,
        }),
        assoc('menuOptions', { ...state.menuOptions, ...menuOptions }),
      )(state);
    }

    case getType(menuCategoriesActions.fetchMenuCategoriesAsync.success): {
      const menuItems = action.payload.entities.menuItems;
      return assoc('all', { ...state.all, ...menuItems })(state);
    }

    case getType(cartActions.fetchCartAsync.success): {
      const menuItems = action.payload.entities.menuItems;
      return assoc('all', { ...state.all, ...menuItems })(state);
    }

    case getType(clearCustomizationsAction): {
      const { menuItemId } = action.payload;
      return pipe(
        assocPath<{}, MenuItemState>(['selectedAddons', menuItemId], {}),
        assocPath<{}, MenuItemState>(['selectedExcludes', menuItemId], {}),
        assocPath<{}, MenuItemState>(['selectedChoices', menuItemId], {}),
      )(state);
    }

    case 'INC_ADDON_QTY': {
      const { menuItemId, addonId, inc } = payload;

      let preAmount = 0;
      // TODO: fix typechecking here
      const relevantSA: any = state.selectedAddons[menuItemId];
      if (relevantSA && relevantSA[addonId]) {
        preAmount = relevantSA[addonId].amount;
      }

      if (!preAmount) preAmount = 0;

      let newAmount = preAmount + inc;
      if (newAmount < 0) newAmount = 0;

      return assocPath<number, MenuItemState>(
        ['selectedAddons', menuItemId, addonId, 'amount'],
        newAmount,
      )(state);
    }

    case 'EXCLUDE_INGREDIENT': {
      const { menuItemId, ingredientId, excluded } = payload;
      if (!excluded) {
        return dissocPath<MenuItemState>([
          'selectedExcludes',
          menuItemId,
          ingredientId,
        ])(state);
      }
      return assocPath<any, MenuItemState>(
        ['selectedExcludes', menuItemId, ingredientId],
        {},
      )(state);
    }

    case 'SELECT_CHOICE': {
      const { menuItemId, optionId, choiceId } = payload;
      return assocPath<any, MenuItemState>(
        ['selectedChoices', menuItemId, optionId],
        {
          [choiceId]: {},
        },
      )(state);
    }

    // case menuCategoryTypes.FETCH_MENUCATEGORIES_DONE: {
    //   const categories = payload.res;
    //   let newState = state;
    //   categories.forEach((category) => {
    //     if (!category.items) return;
    //     MapToList(category.items).forEach(item => {
    //       if (item.published) {
    //         const updatedItem = useOldPropsIfNewNA(state.all[item.id], item, keepProps);
    //         newState = assocPath(['all', item.id], updatedItem)(newState);
    //       }
    //     });
    //   })
    //   return newState;
    // }

    case 'FAV_MENUITEM_INIT': {
      const { id, fav } = payload;
      return assocPath<boolean, MenuItemState>(['all', id, 'favorite'], fav)(
        state,
      );
    }
    case 'FAV_MENUITEM_DONE': {
      const { id, fav } = payload.initPayload;
      return assocPath<boolean, MenuItemState>(['all', id, 'favorite'], fav)(
        state,
      );
    }
    case 'FAV_MENUITEM_FAIL': {
      const { id, fav } = payload.initPayload;
      return assocPath<boolean, MenuItemState>(['all', id, 'favorite'], !fav)(
        state,
      );
    }

    default:
      return state;
  }
}
