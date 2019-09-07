import pipe from 'ramda/src/pipe';
import filter from 'ramda/src/filter';
import map from 'ramda/src/map';
import unnest from 'ramda/src/unnest';
import prop from 'ramda/src/prop';
import pluck from 'ramda/src/pluck';
import zipObj from 'ramda/src/zipObj';
import assocPath from 'ramda/src/assocPath';

import { of, from } from 'rxjs';
import { map as rxMap, mergeMap, switchMap, catchError } from 'rxjs/operators';
import { Epic, ofType } from 'redux-observable';
import { fetchSeatsInit } from '../seat/actions.js';
import { getType } from 'typesafe-actions';
import { normalize, schema } from 'normalizr';
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
  CartResponse,
  CartResponseNormalized,
  OrderItem,
  RmFromCartRequest,
} from 'CartModels';
import * as API from '@dinify/common/src/api/v2/restaurant';

const { MapToList, handleEpicAPIError } = require('@dinify/common/dist/lib/FN');
const snackbar = require('material-ui-snackbar-redux').snackbarActions;

const processChoices = (menuItemId: string, selectedChoices: any) => {
  const relevantSC = selectedChoices[menuItemId];
  if (!relevantSC) return [];
  return Object.keys(relevantSC).map((choiceId) => ({
    id: choiceId
  }));
}

const processExcludes = (menuItemId: string, selectedExcludes: any) => {
  const relevantSE = selectedExcludes[menuItemId];
  if (!relevantSE) return [];
  return Object.keys(relevantSE).map((ingredientId) => ({
    id: ingredientId
  }));
}

const processAddons = (menuItemId: string, selectedAddons: any) => {
  const relevantSA = selectedAddons[menuItemId];
  if (!relevantSA) return [];
  return Object.keys(relevantSA).map((addonId) => ({
    id: addonId,
    amount: relevantSA[addonId].amount
  }));
}

const owner = new schema.Entity('owner');

const menuItem = new schema.Entity('menuItems');

const orderAddons = new schema.Entity('addons', {}, {
  idAttribute: 'addonId',
  processStrategy: prop('addon')
})
const orderChoices = new schema.Entity('choices', {}, {
  idAttribute: 'choiceId',
  processStrategy: prop('choice')
});
const orderExcludes = new schema.Entity('excludes', {}, {
  idAttribute: 'ingredientId',
  processStrategy: prop('ingredient')
});
const orderItem = new schema.Entity('orderItems', {
  owners: [owner],
  menuItem: menuItem,
  orderAddons: [orderAddons],
  orderChoices: [orderChoices],
  orderExcludes: [orderExcludes]
});
const cart = {
  items: [orderItem]
};

const keyedPropsOfList = (keyProp: string, valProp: string) => 
  (list: any[]) => zipObj(pluck(keyProp)(list), pluck(valProp)(list));


const getCartEpic: Epic = (action$) =>
  action$.pipe(
    ofType(getType(fetchCartAsync.request)),
    switchMap((action) => from(API.GetCart()).pipe(
      rxMap((res: CartResponse) => {

        const orderItems: OrderItem[] = res.items;
        
        const addonsByOrderItemId = keyedPropsOfList('id', 'orderAddons')(orderItems);

        let normalized: CartResponseNormalized = normalize(res, cart);

        return fetchCartAsync.success(normalized);
      }),
      catchError(error => {
        console.log(error);
        return handleEpicAPIError({
          error,
          failActionType: getType(fetchCartAsync.failure),
          initAction: action
        })
      })
    ))
  );

const addToCartEpic: Epic = (action$, state$) =>
  action$.pipe(
    ofType(getType(addToCartAsync.request)),
    switchMap((action) => {
      
      const { payload: { menuItemId } } = action;
      const {
        selectedAddons,
        selectedExcludes,
        selectedChoices
      } = state$.value.menuItem;

      const apiPayload = {
        menuItemId,
        choices: processChoices(menuItemId, selectedChoices),
        excludes: processExcludes(menuItemId, selectedExcludes),
        addons: processAddons(menuItemId, selectedAddons)
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

const rmFromCartEpic: Epic = (action$) =>
  action$.pipe(
    ofType(getType(rmFromCartAsync.request)),
    switchMap((action) => {

      const payload: RmFromCartRequest = action.payload;

      return from(API.RemoveFromCart(payload)).pipe(
        mergeMap((res: any) => of(
          rmFromCartAsync.success(res),
          snackbar.show({
            message: 'Removed from cart',
          })
        )),
        catchError(error => handleEpicAPIError({
          error,
          failActionType: getType(rmFromCartAsync.failure),
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
  getCartEpic,
  addToCartEpic,
  rmFromCartEpic,
  orderEpic,
  updateAfterEditEpic
];
