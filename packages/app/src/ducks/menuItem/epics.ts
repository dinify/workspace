import { from } from 'rxjs';
import { switchMap, map, catchError } from 'rxjs/operators';
import { ofType, Epic } from 'redux-observable';
import * as API from '@dinify/common/src/api/v2/restaurant';
import { fetchMenuItemAsync } from './actions';
import { getType } from 'typesafe-actions';
import { MenuItemResponseNormalized } from 'MenuItemsModels';
import { normalize, schema } from 'normalizr';

import { handleEpicAPIError } from '@dinify/common/src/lib/FN';

const addon = new schema.Entity('addons');
const ingredient = new schema.Entity('ingredients');
const choice = new schema.Entity('choices');
const option = new schema.Entity('options', {
  choices: [choice]
});

const createPivotId = (key: string) => (v: any, p: any) => `${p.id}.${v[key].id}`

const menuAddon = new schema.Entity('menuAddons', {
  addon
}, { idAttribute: createPivotId('addon') });

const menuIngredient = new schema.Entity('menuIngredients', {
  ingredient
}, { idAttribute: createPivotId('ingredient') });

const menuOption = new schema.Entity('menuOptions', {
  option
}, { idAttribute: createPivotId('option') });


const menuItem = new schema.Entity('menuItems', {
  menuAddons: [menuAddon],
  menuOptions: [menuOption],
  menuIngredients: [menuIngredient],
});


const getMenuItemEpic: Epic = (action$) =>
  action$.pipe(
    ofType(getType(fetchMenuItemAsync.request)),
    switchMap((action) => {

      const { menuItemId } = action.payload;

      const promise = API.GetMenuItem({ menuItemId });

      return from(promise).pipe(
        map((res: any) => {

          const normalized: MenuItemResponseNormalized = normalize(res, menuItem);

          return fetchMenuItemAsync.success(normalized);
        }),
        catchError(error => {
          return handleEpicAPIError({
            error,
            failActionType: getType(fetchMenuItemAsync.failure),
            initAction: action
          })
        })
      );

    })
  );

// const favEpic: Epic = (action$) =>
//   action$.pipe(
//     ofType('dinify/menuItem/FAV_MENUITEM_INIT'),
//     debounceTime(500),
//     exhaustMap((action) => {
//       const { payload } = action;
//       return from(API.FavMenuitem(payload)).pipe(
//         map(res => favMenuitemDone({res, initPayload: payload })),
//         catchError(error => handleEpicAPIError({
//           error,
//           failActionType: 'dinify/menuItem/FAV_MENUITEM_FAIL',
//           initAction: action
//         }))
//       )
//     })
//   );

export default [
  getMenuItemEpic,
  // favEpic
];
