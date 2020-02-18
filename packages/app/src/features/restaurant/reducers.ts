import { Restaurant, FavRestaurantRequest, RestaurantMap } from 'RestaurantModels';
import assoc from 'ramda/es/assoc';
import assocPath from 'ramda/es/assocPath';
import * as actions from './actions';
import * as wsActions from '../socket/actions';
import { createReducer, ActionType, createAction } from 'typesafe-actions';
import { combineReducers } from 'redux';
import { actionTypes as fActionTypes } from 'react-redux-firebase';
import { ListToMap } from '@dinify/common/src/lib/FN';

type Action = ActionType<typeof actions>;

export const all = createReducer<RestaurantMap, Action>({})

  .handleAction(actions.fetchRestaurantsAsync.success, (_, action) => {
    const restaurants: Restaurant[] = action.payload;
    return ListToMap(restaurants);
  })

  .handleAction(actions.fetchRestaurantAsync.success, (state, action) => {
    const restaurant: Restaurant = action.payload;
    return assoc(restaurant.id, restaurant)(state);
  })

  .handleAction(actions.favRestaurantAsync.request, (state, action) => {
    const { restaurantId, fav }: FavRestaurantRequest = action.payload;
    return assocPath<boolean, RestaurantMap>([restaurantId, 'favorite'], fav)(state);
  })

  .handleAction(actions.favRestaurantAsync.success, (state, action) => {
    const { restaurantId, fav }: FavRestaurantRequest = action.payload.initPayload;
    return assocPath<boolean, RestaurantMap>([restaurantId, 'favorite'], fav)(state);
  })

  .handleAction(actions.favRestaurantAsync.failure, (state, action: any) => {
    const { restaurantId, fav } = action.initPayload;

    if (action.payload.errorType === 'already-favorite') {
      return assocPath<boolean, RestaurantMap>([restaurantId, 'favorite'], true)(state);
    }

    return assocPath<boolean, RestaurantMap>([restaurantId, 'favorite'], !fav)(state);
  });


export const checkedInRestaurant = createReducer(null)
  .handleAction(actions.fetchStatusAsync.success, (_, action) => {
    return action.payload.checkedInRestaurant;
  })
  .handleAction([
    wsActions.checkoutAllAction,
    createAction(fActionTypes.LOGOUT)<any>()
  ], () => null);

export const checkinPlan = createReducer(null)
  .handleAction(actions.planCheckinAction, (_, action): any => {
    return action.payload;
  })
  .handleAction([
    actions.execCheckinAsync.success,
    actions.execCheckinAsync.failure,
    createAction(fActionTypes.LOGOUT)<any>()
  ], () => null);

export const favorites = createReducer<RestaurantMap, Action>({})
  .handleAction(actions.fetchFavoriteRestaurantsAsync.success, (_, action) => {
    const restaurants: Restaurant[] = action.payload;
    return ListToMap(restaurants);
  });

const restaurantReducer = combineReducers({
  all,
  favorites,
  checkedInRestaurant,
  checkinPlan
});

export default restaurantReducer;
export type RestaurantState = ReturnType<typeof restaurantReducer>;

// TODO
// case wsTypes.CHECKOUT_ALL: {
//   const s = assoc('checkedInRestaurant', null)(state);
//   return assoc('status', null)(s);
// }

// case getType(fetchStatusAsync.failure): {
//   const payload = action.payload;
//   if (payload instanceof Array && payload[0].status === 401) {
//     return assoc('checkedInRestaurant', null)(state);
//   }
//   return state;
// }

// case authTypes.LOGOUT_DONE: {
//   return assoc('checkedInRestaurant', null)(state);
// }
