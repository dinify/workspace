import pipe from 'ramda/src/pipe';
import filter from 'ramda/src/filter';
import map from 'ramda/src/map';
import unnest from 'ramda/src/unnest';
import { of, from } from 'rxjs';
import { mergeMap, switchMap, catchError } from 'rxjs/operators';
import { Epic, ofType } from 'redux-observable';
import { fetchSeatsInit } from '../seat/actions.js';
import { getType } from 'typesafe-actions';
import {
  addToCartAsync,
  fetchCartAsync,
  orderAsync,
  rmFromCartAsync,
} from './actions';
import {
  MenuItem,
  Option,
  Choice,
  Ingredient,
  Addon,
} from 'CartModels';
import * as API from '@dinify/common/src/api/v2/restaurant';

const { MapToList, handleEpicAPIError } = require('@dinify/common/dist/lib/FN');
const snackbar = require('material-ui-snackbar-redux').snackbarActions;

const processChoices = pipe(
  (m: object) => MapToList(m),
  map((option: Option) => MapToList(option.choices)),
  (nestedList: any) => unnest(nestedList),
  (list: any) => filter((choice: Choice) => !!choice.selected, list),
  map((choice: Choice) => ({ id: choice.id }))
);

const processExcludes = pipe(
  (m: object) => MapToList(m),
  (list: [Ingredient]) => filter((ingredient) => !!ingredient.excluded, list),
  map((ingredient) => ({ id: ingredient.id }))
);

const processAddons = pipe(
  (m: object) => MapToList(m),
  (list: [Addon]) => filter((addon) => addon.qty ? addon.qty > 0 : true, list),
  map((addon: Addon) => ({
    id: addon.id,
    amount: addon.qty,
  }))
);

const addToCartEpic: Epic = (action$, state$) =>
  action$.pipe(
    ofType(getType(addToCartAsync.request)),
    switchMap((action) => {
      
      const { payload: { menuItemId } } = action;
      const menuItem: MenuItem = state$.value.menuItem.all[menuItemId];

      const apiPayload = {
        menuItemId,
        choices: processChoices(menuItem.options),
        excludes: processExcludes(menuItem.ingredients),
        addons: processAddons(menuItem.addons)
      };

      return from(API.AddToCart(apiPayload)).pipe(
        mergeMap((res: any) => of(
          addToCartAsync.success(res),
          fetchCartAsync.request(),
          snackbar.show({
            message: 'Added to cart',
            handleAction: () => window.location.assign('/dinein'),
            action: 'Go to cart'
          })
        )),
        catchError(error => handleEpicAPIError({
          error,
          failActionType: getType(addToCartAsync.failure),
          initAction: action
        }))
      );

    })
  );

const orderEpic: Epic = (action$) =>
  action$.pipe(
    ofType(getType(orderAsync.request)),
    switchMap((action) => {
      return from(API.Order()).pipe(
        mergeMap((res: any) => of(
          orderAsync.success(res),
          fetchCartAsync.request(),
          snackbar.show({
            message: 'Order has been placed'
          })
        )),
        catchError(error => handleEpicAPIError({
          error,
          failActionType: getType(orderAsync.failure),
          initAction: action
        }))
      );
    })
  );

const updateAfterEditEpic: Epic = (action$) =>
  action$.pipe(
    ofType(getType(rmFromCartAsync.success)),
    mergeMap(() => {
      const callActions = [
        fetchSeatsInit(),
        fetchCartAsync.request()
      ];
      return callActions;
    })
  );

export default [
  addToCartEpic,
  orderEpic,
  updateAfterEditEpic
];
