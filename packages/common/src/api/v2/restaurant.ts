import { Get, Post, Delete } from './Network';

export const GetListOfRestaurants = () => {
  return Get({
    path: `restaurants`
  });
}

export const GetRestaurantById = ({ restaurantId, populateWith }) => {
  let scopes = '';
  if (populateWith) scopes = `?scopes=${populateWith}`;
  return Get({
    path: `restaurants/${restaurantId}${scopes}`
  });
}

export const GetMenuCategoriesOfSubdomain = ({ subdomain }) => Get({
  path: `restaurant/subdomain/${subdomain}/menu/categories`
});

 // Used by dashboard only - subdomain is id in fact (TODO)
export const GetMenucategories = ({ subdomain }) => Get({
  path: `restaurant/${subdomain}/menuCategories`
});

export const GetRestaurantingredients = ({ restaurantId }) => Get({
  path: `restaurant/${restaurantId}/ingredients`
});

export const GetSeatsOfWB = ({ waiterboardId }) => Get({
  path: `waiterboard/${waiterboardId}/seats/all`
});

type CheckinBody = {
  qr: string;
}

export const Checkin = (body: CheckinBody) => Post({
  path: `checkin`
}, body);

export const CheckOut = ({ tableId }) => Post({
  path: `table/${tableId}/checkout`
});

export const CheckOutUser = ({ userId }) => Post({
  path: `checkout/user/${userId}`
});

export const GetCalls = ({ waiterboardId }) => Get({
  path: `waiterboard/${waiterboardId}/calls`
});

// replace any with Cart
export const GetCart = (): Promise<any> => Get({
  path: `cart`
});

export const AddToCart = (body) => Post({
  path: 'cart'
}, body);

type RemoveFromCartProps = {
  orderItemId: string
}
export const RemoveFromCart = ({ orderItemId }: RemoveFromCartProps) => Delete({
  path: `cart/item/${orderItemId}`
});

export const Order = () => Post({
  path: 'order/dinein'
});
