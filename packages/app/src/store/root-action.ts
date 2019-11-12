import * as cartActions from '../features/cart/actions';
import * as restaurantActions from '../features/restaurant/actions';
import * as menuCatrgoryActions from '../features/menuItem/actions';
import * as menuItemActions from '../features/menuItem/actions';
import * as transactionActions from '../features/transaction/actions';
import * as serviceActions from '../features/service/actions';

export default {
  cart: cartActions,
  restaurant: restaurantActions,
  menuCategory: menuCatrgoryActions,
  menuItem: menuItemActions,
  transaction: transactionActions,
  service: serviceActions,
};
