import { of, from } from 'rxjs';
import { mergeMap, switchMap, catchError } from 'rxjs/operators';
import { ofType } from 'redux-observable';
import { snackbarActions as snackbar } from 'material-ui-snackbar-redux'
import * as API from '@dinify/common/dist/api/restaurant';
import * as FN from '@dinify/common/dist/lib/FN';
import { handleEpicAPIError } from '@dinify/common/dist/lib/FN';
import { fetchSeatsInit } from 'ducks/seat/actions';
import types from './types';
import {
  addToCartDone,
  fetchCartInit,
  orderDone,
} from './actions';

const addToCartEpic = (action$, state$) =>
  action$.pipe(
    ofType(types.ADD_TO_CART_INIT),
    switchMap((action) => {
      const { payload: { menuItemId } } = action;
      const menuItem = state$.value.menuItem.all[menuItemId];
      const choices = [];
      FN.MapToList(menuItem.options).forEach((option) => {
        FN.MapToList(option.choices).forEach((choice) => {
          if (choice.selected) choices.push({id: choice.id});
        })
      })
      const excludes = [];
      FN.MapToList(menuItem.ingredients).forEach((ingredient) => {
        if (ingredient.excluded) excludes.push({id: ingredient.id});
      })
      const addons = [];
      FN.MapToList(menuItem.addons).forEach((addon) => {
        if (addon.qty > 0) addons.push({
          id: addon.id,
          amount: addon.qty,
        });
      })
      const apiPayload = { menuItemId, choices, excludes, addons }
      return from(API.AddToCart(apiPayload)).pipe(
        mergeMap(res => of(
          addToCartDone(res),
          fetchCartInit(),
          snackbar.show({
            message: 'Added to cart',
            handleAction: () => window.location.assign('/eat'),
            action: 'Go to cart'
          })
        )),
        catchError(error => handleEpicAPIError({
          error,
          failActionType: types.ADD_TO_CART_FAIL,
          initAction: action
        }))
      );
    })
  );

const orderEpic = (action$, state$) =>
  action$.pipe(
    ofType(types.ORDER_INIT),
    switchMap((action) => {
      const orderType = state$.value.cart.orderType;
      return from(API.Order({ orderType })).pipe(
        mergeMap(res => of(
          orderDone(res),
          fetchCartInit(),
          snackbar.show({
            message: 'Order has been placed'
          })
        )),
        catchError(error => handleEpicAPIError({
          error,
          failActionType: types.ORDER_FAIL,
          initAction: action
        }))
      );
    })
  );

const updateAfterEditEpic = (action$) =>
  action$.pipe(
    ofType(types.REMOVE_ORDERITEM_DONE),
    mergeMap(() => {
      const callActions = [
        fetchSeatsInit(),
        fetchCartInit()
      ];
      return callActions;
    })
  );

export default [
  addToCartEpic,
  orderEpic,
  updateAfterEditEpic
];
