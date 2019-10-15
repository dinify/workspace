import { of, from } from 'rxjs';
import { map as rxMap, mergeMap, switchMap, catchError, debounceTime, filter } from 'rxjs/operators';
import { Epic, ofType } from 'redux-observable';
import { fetchSeatsInit } from '../seat/actions.js';
import { getType } from 'typesafe-actions';
import { normalize } from 'normalizr';
import { cart } from './schemas';
import {
  addToCartAsync,
  fetchCartAsync,
  orderAsync,
  rmFromCartAsync,
} from './actions';
import * as transactionActions from '../transaction/actions';
import * as uiActions from '../ui/actions';
import {
  CartResponse,
  CartResponseN,
  RmFromCartRequest,
} from 'CartModels';
import * as API from '@dinify/common/src/api/v2/restaurant';
// TODO: fix this shit
import { currentT as t } from '@dinify/common/src/lib/i18n/useTranslation';

import { handleEpicAPIError } from '@dinify/common/src/lib/FN';
const snackbar = require('material-ui-snackbar-redux').snackbarActions;

// const keyedPropsOfList = (keyProp: string, valProp: string) =>
// (list: any[]) => zipObj(pluck(keyProp)(list), pluck(valProp)(list));

const getCartEpic: Epic = (action$) =>
  action$.pipe(
    ofType(getType(fetchCartAsync.request)),
    switchMap((action) => from(API.GetCart()).pipe(
      filter((res: any) => !!res && !!res.items),
      rxMap((res: CartResponse) => {

        // const orderItems: OrderItem[] = res.items;
        // const addonsByOrderItemId = keyedPropsOfList('id', 'orderAddons')(orderItems);

        let normalized: CartResponseN = normalize(res, cart);

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

const processCustomizations = (menuItemId: string, selectedCusomizations: any) => {
  const relevantCol = selectedCusomizations[menuItemId];
  if (!relevantCol) return [];
  return Object.keys(relevantCol).map((id) => ({ id, ...relevantCol[id] }));
}

const addToCartEpic: Epic = (action$, state$) =>
  action$.pipe(
    ofType(getType(addToCartAsync.request)),
    debounceTime(500),
    mergeMap((action) => {
      
      const { payload: { menuItemId } } = action;
      const {
        selectedAddons,
        selectedExcludes,
        selectedChoices
      } = state$.value.menuItem;

      const apiPayload = {
        menuItemId,
        choices: processCustomizations(menuItemId, selectedChoices),
        excludes: processCustomizations(menuItemId, selectedExcludes),
        addons: processCustomizations(menuItemId, selectedAddons)
      };

      return from(API.AddToCart(apiPayload)).pipe(
        mergeMap((res: any) => of(
          addToCartAsync.success(res),
          fetchCartAsync.request(),
          snackbar.show({
            message: t('successMessages.added-to-cart'),
            handleAction: () => { throw new Error('Not implemented'); },
            action: 'Undo'
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

const addToCartErrorEpic: Epic = (action$) =>
  action$.pipe(
    ofType(getType(addToCartAsync.failure)),
    switchMap((action) => {
      const { payload: { errorType } } = action;
      return of(
        snackbar.show({
          message: t(`errorMessages.${errorType}`)
        })
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
          fetchCartAsync.request(),
          snackbar.show({
            message: t('successMessages.removed-from-cart')
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
          transactionActions.fetchBillAsync.request(),
          uiActions.closeDialogAction('cart-page'),
          snackbar.show({
            message: t('successMessages.order-has-been-placed')
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
  addToCartErrorEpic,
  rmFromCartEpic,
  orderEpic,
  updateAfterEditEpic
];
