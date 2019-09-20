import { Get, Post, Patch, Delete } from './Network';

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

export const GetSeatsOfWaiterboard = ({ waiterboardId }: any) => Get({
  path: `waiterboard/${waiterboardId}/seats`
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

export const ConfirmOrder = ({ orderId }: any): Promise<any> => Patch({
  path: `order/${orderId}`
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

export const ConfirmBill = ({ billId, type }: any): Promise<any> => Patch({
  path: `transaction`
}, {
  id: billId,
  type
});

export const GetOrdersOfWaiterboard = ({ waiterboardId }: { waiterboardId: string}): Promise<any> => Get({
  path: `waiterboard/${waiterboardId}/orders?status=confirmed,dispatched&today=true`
});

export const GetTransactionsOfWaiterboard = ({ waiterboardId }: { waiterboardId: string}): Promise<any> => Get({
  path: `waiterboard/${waiterboardId}/transactions/today`
});

export const GetCallsOfWaiterboard = ({ waiterboardId }: { waiterboardId: string}): Promise<any> => Get({
  path: `waiterboard/${waiterboardId}/calls?status=dispatched`
});

export const ConfirmCall = ({ callId }: { callId: string }): Promise<any> => Patch({
  path: `service/call/${callId}/confirm`
});

export const GetServicesOfRestaurant = ({ restaurantId }: { restaurantId: string }): Promise<any> => Get({
  path: `restaurant/${restaurantId}/services`
});

export const GetLanguagesOfRestaurant = ({ restaurantId }: { restaurantId: string }): Promise<any> => Get({
  path: `restaurant/${restaurantId}/languages`
});
