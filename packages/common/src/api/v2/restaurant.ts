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

export const GetSeatsOfWaiterboard = ({ waiterboardId }: any): Promise<any> => Get({
  path: `waiterboard/${waiterboardId}/seats`
});

export const CheckinStatus = (): Promise<any> => Get({
  path: 'checkin/status'
});

export const Checkin = (body: { qr: string}): Promise<any> => Post({
  path: `checkin`
}, body);

export const CheckOut = ({ tableId }: any): Promise<any> => Post({
  path: `table/${tableId}/checkout`
});

export const CheckOutUser = ({ userId }: any): Promise<any> => Post({
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
  path: 'transaction/initiate'
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

export const CallService = ({ serviceId }: { serviceId: string }): Promise<any> => Post({
  path: `service/${serviceId}/call`
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

type CreateServiceBody = {
	name: string;
	restaurantId: string;
	imageId: string;
	type: string;
}

export const CreateService = (body: CreateServiceBody): Promise<any> => Post({
  path: `services`
}, body);

export const GetMenuCategories = ({ restaurantId }: any, lang?: string): Promise<any> => Get({
  path: `restaurant/${restaurantId}/menuCategories`,
  lang
});

export const CreateMenuCategory = (body: any): Promise<any> => Post({
  path: `menuCategories`
}, body);

export const GetMenuItem = ({ menuItemId }: any, lang?: string): Promise<any> => Get({
  path: `menu/item/${menuItemId}`,
  lang
});

export const CreateMenuItem = (body: any): Promise<any> => Post({
  path: `menuItems`
}, body);

export const UpdateMenuItem = (menuItemId: string, body: any): Promise<any> => Patch({
  path: `menuItems/${menuItemId}`
}, body);

export const GetRestaurantIngredients = ({ restaurantId }: any, lang?: string): Promise<any> => Get({
  path: `restaurants/${restaurantId}/ingredients`,
  lang
});

export const CreateIngredient = (body: any): Promise<any> => Post({
  path: `ingredients`
}, body);

export const GetRestaurantAddons = ({ restaurantId }: any, lang?: string): Promise<any> => Get({
  path: `restaurants/${restaurantId}/addons`,
  lang
});

export const CreateAddon = (body: any): Promise<any> => Post({
  path: `addons`
}, body);

export const GetRestaurantOptions = ({ restaurantId }: any, lang?: string): Promise<any> => Get({
  path: `restaurants/${restaurantId}/options`,
  lang
});

export const CreateOption = (body: any): Promise<any> => Post({
  path: `options`
}, body);

export const CreateChoice = (body: any): Promise<any> => Post({
  path: `choices`
}, body);
