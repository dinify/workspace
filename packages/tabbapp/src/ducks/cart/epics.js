// @flow
import { Observable } from 'rxjs';
import * as API from 'api/restaurant';
// import R from 'ramda';
import * as FN from 'lib/FN';
import types from './types';
import {
  addToCartDone,
  addToCartFail,
  fetchCartInit,
} from './actions';


type addToCartProps = {
  payload: {
    menuItemId: string,
  }
}
const addToCartEpic = (action$: Observable, { getState }) =>
  action$
    .ofType(types.ADD_TO_CART_INIT)
    .switchMap(({ payload: { menuItemId } }: addToCartProps) => {
      const state = getState();
      const menuItem = state.menuItem.all[menuItemId];
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
      return Observable.fromPromise(API.AddToCart(apiPayload))
        .mergeMap(res => {
          return Observable.of(addToCartDone(res), fetchCartInit());
        })
        .catch(error => Observable.of(addToCartFail(error)))
    });


export default [
  addToCartEpic
];
