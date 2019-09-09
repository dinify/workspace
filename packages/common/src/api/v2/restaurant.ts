import { Get, Post, Delete } from './Network';

export const GetListOfRestaurants = () => {
  return Get({
    path: `restaurants`
  });
}

export const GetRestaurantById = ({ restaurantId, populateWith }: any) => {
  let scopes = '';
  if (populateWith) scopes = `?scopes=${populateWith}`;
  return Get({
    path: `restaurants/${restaurantId}${scopes}`
  });
}

export const GetMenuCategoriesOfSubdomain = ({ subdomain }: any) => Get({
  path: `restaurant/subdomain/${subdomain}/menu/categories`
});

export const GetMenuItem = ({ menuItemId }: any) => Get({
  path: `menu/item/${menuItemId}`
});

 // Used by dashboard only - subdomain is id in fact (TODO)
export const GetMenucategories = ({ subdomain }: any) => Get({
  path: `restaurant/${subdomain}/menuCategories`
});

export const GetRestaurantingredients = ({ restaurantId }: any) => Get({
  path: `restaurant/${restaurantId}/ingredients`
});

export const GetSeatsOfWB = ({ waiterboardId }: any) => Get({
  path: `waiterboard/${waiterboardId}/seats/all`
});

type CheckinBody = {
  qr: string;
}

export const Checkin = (body: CheckinBody) => Post({
  path: `checkin`
}, body);

export const CheckOut = ({ tableId }: any) => Post({
  path: `table/${tableId}/checkout`
});

export const CheckOutUser = ({ userId }: any) => Post({
  path: `checkout/user/${userId}`
});

export const GetCalls = ({ waiterboardId }: any) => Get({
  path: `waiterboard/${waiterboardId}/calls`
});

// replace any with Cart
export const GetCart = (): Promise<any> => Get({
  path: `cart`
});

export const GetBill = (): Promise<any> => Get({
  path: `bill`
});

export const AddToCart = (body: any) => Post({
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

type InitiateTransactionProps = {
  gratuity: number;
  type: 'CASH' | 'CARD' | 'ONLINE';
}
export const InitiateTransaction = (
  { gratuity, type }: InitiateTransactionProps
): Promise<any> => Post({
  path: '/transaction/initiate'
}, { gratuity, type });
