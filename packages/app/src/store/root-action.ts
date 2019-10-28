import * as cartActions from '../ducks/cart/actions';
import * as restaurantActions from '../ducks/restaurant/actions';
import * as menuCatrgoryActions from '../ducks/menuItem/actions';
import * as menuItemActions from '../ducks/menuItem/actions';
import * as transactionActions from '../ducks/transaction/actions';
import * as serviceActions from '../ducks/service/actions';


export default {
  cart: cartActions,
  restaurant: restaurantActions,
  menuCategory: menuCatrgoryActions,
  menuItem: menuItemActions,
  transaction: transactionActions,
  service: serviceActions,
};
