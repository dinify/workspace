import { routerActions } from 'connected-react-router';
import * as cartActions from '../ducks/cart/actions';
import * as restaurantActions from '../ducks/restaurant/actions';

export default {
  router: routerActions,
  cart: cartActions,
  restaurant: restaurantActions
};
