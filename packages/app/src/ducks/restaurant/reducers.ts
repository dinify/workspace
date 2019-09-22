import { Restaurant, FavRestaurantRequest } from 'RestaurantModels';
import assoc from 'ramda/es/assoc';
import assocPath from 'ramda/es/assocPath';
import * as actions from './actions';
import * as wsActions from '../../websockets/actions';
// import wsTypes from '../../websockets/types';
import { createReducer, ActionType } from 'typesafe-actions';
import { combineReducers } from 'redux';

// const authTypes = require('@dinify/common/dist/ducks/auth/types');
const { ListToMap } = require('@dinify/common/dist/lib/FN');


type State = any;
type Action = ActionType<typeof actions>;

export const all = createReducer<State, Action>({})

  .handleAction(actions.fetchRestaurantsAsync.success, (state, action) => {
    state;
    const restaurants: Restaurant[] = action.payload;
    return ListToMap(restaurants);
  })

  .handleAction(actions.fetchRestaurantAsync.success, (state, action) => {
    const restaurant: Restaurant = action.payload.res;
    return assoc(restaurant.id, restaurant)(state);
  })

  .handleAction(actions.favRestaurantAsync.request, (state, action) => {
    const { id, fav }: FavRestaurantRequest = action.payload;
    return assocPath([id, 'favorite'], fav)(state);
  })

  .handleAction(actions.favRestaurantAsync.success, (state, action) => {
    const { id, fav }: FavRestaurantRequest = action.payload.initPayload;
    return assocPath([id, 'favorite'], fav)(state);
  })

  .handleAction(actions.favRestaurantAsync.failure, (state, action) => {
    const { id, fav } = action.payload.initPayload;
    return assocPath([id, 'favorite'], !fav)(state);
  });


export const checkedInRestaurant = createReducer<State, Action>(null)
  .handleAction(actions.fetchStatusAsync.success, (state, action) => {
    return action.payload.checkedInRestaurant;
  })
  .handleAction(wsActions.checkoutAllAction, () => {
    return null;
  });

const restaurantReducer = combineReducers({
  all,
  checkedInRestaurant,
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
