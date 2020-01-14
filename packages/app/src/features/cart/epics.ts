import { of, from } from 'rxjs';
import {
  map as rxMap,
  mergeMap,
  switchMap,
  catchError,
  debounceTime,
  takeUntil,
  filter,
} from 'rxjs/operators';
import { Epic, ofType } from 'redux-observable';
import { getType, isActionOf } from 'typesafe-actions';
import { normalize } from 'normalizr';
import { cart } from './schemas';
import {
  addToCartAsync,
  fetchCartAsync,
  orderAsync,
  rmFromCartAsync,
  fetchUserCartAsync
} from './actions';
import * as transactionActions from '../transaction/actions';
import * as uiActions from '../ui/actions';
import { CartResponse, CartResponseN, RmFromCartRequest } from 'CartModels';
import * as API from '@dinify/common/src/api/v2/restaurant';

import { handleEpicAPIError } from '@dinify/common/src/lib/FN';
import keys from 'ramda/es/keys';
import values from 'ramda/es/values';

// const keyedPropsOfList = (keyProp: string, valProp: string) =>
// (list: any[]) => zipObj(pluck(keyProp)(list), pluck(valProp)(list));

const getCartEpic: Epic = action$ =>
  action$.pipe(
    ofType(getType(fetchCartAsync.request)),
    switchMap(action =>
      from(API.GetCart()).pipe(
        rxMap(res => {
          if (!!res && !!res.items && res.items.length > 0) {
            return res;
          } else {
            throw new Error('Invalid response structure');
          }
        }),
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
            initAction: action,
          });
        }),
        takeUntil(action$.pipe(filter(isActionOf(fetchCartAsync.cancel)))),
      ),
    ),
  );

const getUserCartEpic: Epic = (action$, state$) =>
  action$.pipe(
    ofType(getType(fetchUserCartAsync.request)),
    switchMap(action => {
      const { userId, restaurantId } = action.payload;
      return from(API.GetUserCart({ userId, restaurantId })).pipe(
        rxMap(res => {
          if (!!res && !!res.items && res.items.length > 0) {
            return res;
          } else {
            throw new Error('Invalid response structure');
          }
        }),
        rxMap((res: CartResponse) => {
          return fetchUserCartAsync.success({
            ...res,
            userId,
            restaurantId
          });
        }),
        catchError(error => {
          console.log(error);
          return handleEpicAPIError({
            error,
            failActionType: getType(fetchUserCartAsync.failure),
            initAction: action,
          });
        }),
      );
    }),
  );

const processCustomizations = (
  menuItemId: string,
  selectedCusomizations: any,
) => {
  const relevantCol = selectedCusomizations[menuItemId];
  if (!relevantCol) return [];
  return Object.keys(relevantCol).map(id => ({ id, ...relevantCol[id] }));
};

const onDemandAnonymousAuthEpic: Epic = (action$, state$, { firebase }) =>
  action$.pipe(
    ofType(getType(addToCartAsync.request)),
    mergeMap(action => {
      const { payload, type } = action;

      const user = state$.value.firebase.auth;

      if (user.isEmpty) {
        return from(firebase.auth().signInAnonymously()).pipe(
          rxMap(() => {
            return { type: `${type}_AUTHED`, payload }
          })
        );
      } else {
        return of({ type: `${type}_AUTHED`, payload });
      }

    })
  )

const addToCartEpic: Epic = (action$, state$) =>
  action$.pipe(
    ofType(`${getType(addToCartAsync.request)}_AUTHED`),
    debounceTime(500),
    mergeMap(action => {
      const {
        payload: { menuItemId },
      } = action;
      const {
        selectedAddons,
        selectedExcludes,
        selectedChoices,
      } = state$.value.menuItem;

      const apiPayload = {
        menuItemId,
        choices: values(selectedChoices[menuItemId]).map(o => ({
          id: keys(o)[0],
        })),
        excludes: processCustomizations(menuItemId, selectedExcludes),
        addons: processCustomizations(menuItemId, selectedAddons),
      };

      return from(API.AddToCart(apiPayload)).pipe(
        mergeMap((res: any) =>
          of(
            addToCartAsync.success(res),
            fetchCartAsync.request(),
            uiActions.showSnackbarAction({
              message: t => t('successMessages.added-to-cart'),
              handler: () => {
                console.error('Not implemented: undo');
              },
              action: t => t('undo'),
            }),
          ),
        ),
        catchError(error =>
          handleEpicAPIError({
            error,
            failActionType: getType(addToCartAsync.failure),
            initAction: action,
          }),
        ),
      );
    }),
  );

const addToCartErrorEpic: Epic = action$ =>
  action$.pipe(
    ofType(getType(addToCartAsync.failure)),
    switchMap(action => {
      const {
        payload: { errorType },
      } = action;
      return of(
        uiActions.showSnackbarAction({
          message: t => t(`errorMessages.${errorType}`),
        }),
      );
    }),
  );

const rmFromCartEpic: Epic = action$ =>
  action$.pipe(
    ofType(getType(rmFromCartAsync.request)),
    switchMap(action => {
      const payload: RmFromCartRequest = action.payload;

      return from(API.RemoveFromCart(payload)).pipe(
        mergeMap((res: any) =>
          of(
            rmFromCartAsync.success(res),
            fetchCartAsync.request(),
            uiActions.showSnackbarAction({
              message: t => t('successMessages.removed-from-cart'),
            }),
          ),
        ),
        catchError(error =>
          handleEpicAPIError({
            error,
            failActionType: getType(rmFromCartAsync.failure),
            initAction: action,
          }),
        ),
      );
    }),
  );

const orderEpic: Epic = action$ =>
  action$.pipe(
    ofType(getType(orderAsync.request)),
    switchMap(action => {
      return from(API.Order()).pipe(
        mergeMap((res: any) =>
          of(
            orderAsync.success(res),
            fetchCartAsync.request(),
            transactionActions.fetchBillAsync.request(),
            uiActions.closeDialogAction('cart'),
            uiActions.showSnackbarAction({
              message: t => t('successMessages.order-has-been-placed'),
            }),
          ),
        ),
        catchError(error =>
          handleEpicAPIError({
            error,
            failActionType: getType(orderAsync.failure),
            initAction: action,
          }),
        ),
      );
    }),
  );

// const updateAfterEditEpic: Epic = (action$) =>
//   action$.pipe(
//     ofType(getType(rmFromCartAsync.success)),
//     mergeMap(() => {
//       const callActions = [
//         fetchSeatsInit(),
//         fetchCartAsync.request()
//       ];
//       return callActions;
//     })
//   );

export default [
  getCartEpic,
  getUserCartEpic,
  addToCartEpic,
  addToCartErrorEpic,
  rmFromCartEpic,
  orderEpic,
  onDemandAnonymousAuthEpic
  // updateAfterEditEpic
];
