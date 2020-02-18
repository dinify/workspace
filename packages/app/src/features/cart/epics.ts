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
  fetchUserCartAsync,
  makeCartDoneAsync,
  clearCartAsync
} from './actions';
import * as transactionActions from '../transaction/actions';
import * as uiActions from '../ui/actions';
import { CartResponse, CartResponseN, RmFromCartRequest } from 'CartModels';
import * as API from '@dinify/common/src/api/v2/restaurant';

import { handleEpicAPIError } from '@dinify/common/src/lib/FN';
import keys from 'ramda/es/keys';
import values from 'ramda/es/values';
import { actions as _uiActions } from 'models/ui';
import { TFunction } from '@dinify/common/src/lib/i18n/translations';

// const keyedPropsOfList = (keyProp: string, valProp: string) =>
// (list: any[]) => zipObj(pluck(keyProp)(list), pluck(valProp)(list));

const getCartEpic: Epic = (action$) =>
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

const getUserCartEpic: Epic = (action$) =>
  action$.pipe(
    ofType(getType(fetchUserCartAsync.request)),
    switchMap(action => {
      const { userId, restaurantId } = action.payload;
      return from(API.GetUserCart({ userId, restaurantId })).pipe(
        rxMap(res => {
          if (!!res && !!res.items) {
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
          return handleEpicAPIError({
            error,
            failActionType: getType(fetchUserCartAsync.failure),
            initAction: action,
          });
        }),
      );
    }),
  );

const makeCartDoneEpic: Epic = (action$) =>
  action$.pipe(
    ofType(getType(makeCartDoneAsync.request)),
    switchMap(action => {
      const { userId, restaurantId } = action.payload;
      return from(API.MakeCartDone({ userId, restaurantId })).pipe(
        mergeMap((res) => {
          return of(
            makeCartDoneAsync.success(res),
            fetchUserCartAsync.request({ userId, restaurantId })
          );
        }),
        catchError(error => {
          return handleEpicAPIError({
            error,
            failActionType: getType(makeCartDoneAsync.failure),
            initAction: action,
          });
        }),
      );
    }),
  );

const clearCartEpic: Epic = (action$) =>
  action$.pipe(
    ofType(getType(clearCartAsync.request)),
    switchMap(action => {
      return from(API.ClearCart()).pipe(
        mergeMap((res: any) =>
          of(
            clearCartAsync.success(res),
            fetchCartAsync.request(),
            _uiActions.showSnackbar({
              message: (t: TFunction) => t('successMessages.removed-from-cart'),
            }),
          ),
        ),
        catchError(error => {
          return handleEpicAPIError({
            error,
            failActionType: getType(clearCartAsync.failure),
            initAction: action,
          });
        }),
        takeUntil(action$.pipe(filter(isActionOf(clearCartAsync.cancel)))),
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
            _uiActions.showSnackbar({
              message: (t: TFunction) => t('successMessages.added-to-cart'),
              handler: () => {
                console.error('Not implemented: undo');
              },
              action: (t: TFunction) => t('undo'),
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
      if (errorType === 'cart-already-exists') {
        return of(
          uiActions.openDialogAction({
            type: 'clear-order',
            props: { error: true }
          })
        );
      }
      return of(
        _uiActions.showSnackbar({
          message: (t: TFunction) => t(`errorMessages.${errorType}`),
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
            _uiActions.showSnackbar({
              message: (t: TFunction) => t('successMessages.removed-from-cart'),
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
            _uiActions.showSnackbar({
              message: (t: TFunction) => t('successMessages.order-has-been-placed'),
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
  makeCartDoneEpic,
  getUserCartEpic,
  addToCartEpic,
  addToCartErrorEpic,
  rmFromCartEpic,
  clearCartEpic,
  orderEpic,
  onDemandAnonymousAuthEpic
  // updateAfterEditEpic
];
