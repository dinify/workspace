import { Get, Post, Patch, Delete, PostImage } from './Network';

export const GetListOfRestaurants = () => {
  return Get({
    path: `restaurants`
  });
};

export const GetManagedRestaurants = () => {
  return Get({
    path: `restaurants/managed`
  });
};

export const GetRestaurantById = ({ restaurantId, populateWith }: any) => {
  let scopes = '';
  if (populateWith) scopes = `?scopes=${populateWith}`;
  return Get({
    path: `restaurants/${restaurantId}${scopes}`
  });
};

export const SendPublishRequest = ({ subdomain }: any) => {
  return Post({
    path: `restaurants/${subdomain}/publish/request`
  });
};

export const EditImage = ({ id, precedence, published }: any) => {
  return Patch({ path: `images/${id}` }, { precedence, published });
}

export const GetMenuCategoriesOfSubdomain = ({ subdomain }: any) => Get({
  path: `restaurants/subdomain/${subdomain}/menu/categories`
});

export const GetWaiterboardsOfRestaurant = ({ restaurantId }: any): Promise<any> => Get({
  path: `restaurants/${restaurantId}/waiterboards`
});

export const GetSeatsOfWaiterboard = ({ waiterboardId }: any): Promise<any> => Get({
  path: `waiterboards/${waiterboardId}/seats`
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

export const UpdateTable = ({ id, ...otherProps }: any): Promise<any> => Patch({
  path: `tables/${id}`
}, otherProps);

export const CheckOutUser = ({ userId }: any): Promise<any> => Post({
  path: `checkout/user/${userId}`
});

// replace any with Cart
export const GetCart = (): Promise<any> => Get({
  path: `cart`
});

export const GetUserCart = ({ restaurantId, userId }: any): Promise<any> => Get({
  path: `restaurants/${restaurantId}/carts/${userId}`
});

export const MakeCartDone = ({ restaurantId, userId }: any): Promise<any> => Patch({
  path: `restaurants/${restaurantId}/carts/${userId}`
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

export const ClearCart = () => Delete({
  path: `cart`
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
  path: `waiterboards/${waiterboardId}/orders?status=confirmed,dispatched&today=true`
});

export const GetTransactionsOfWaiterboard = ({ waiterboardId }: { waiterboardId: string}): Promise<any> => Get({
  path: `waiterboards/${waiterboardId}/transactions?status=initiated`
});

export const GetTransactionsHistory = ({ restaurantId, from, to }: any): Promise<any> => Get({
  path: `restaurants/${restaurantId}/transactions?to=${to}&from=${from}`
});

export const GetCallsOfWaiterboard = ({ waiterboardId }: { waiterboardId: string}): Promise<any> => Get({
  path: `waiterboards/${waiterboardId}/calls?status=pending`
});

export const GetCalls = ({ waiterboardId }: any) => Get({
  path: `waiterboards/${waiterboardId}/calls`
});

export const CallService = ({ serviceId }: { serviceId: string }): Promise<any> => Post({
  path: `service/${serviceId}/call`
});

export const ConfirmCall = ({ callId }: { callId: string }): Promise<any> => Patch({
  path: `service/call/${callId}/confirm`
});

export const GetServicesOfRestaurant = ({ restaurantId, defLang }: any): Promise<any> => {
  let append = '';
  if (defLang) {
    append = '?defLang=true'
  }
  return Get({
    path: `restaurants/${restaurantId}/services${append}`
  });
}

export const GetLanguagesOfRestaurant = ({ restaurantId }: { restaurantId: string }): Promise<any> => Get({
  path: `restaurants/${restaurantId}/languages`
});

type CreateRestaurantBody = {
  name: string;
  subdomain: string;
  language: string;
}

export const CreateRestaurant = (body: CreateRestaurantBody): Promise<any> => Post({
  path: `restaurants`
}, body);

type UpdateRestaurantBody = {
  id: string;
  name?: string;
  settings?: {
    paymentCollection: string,
    paymentMethods: [],
    orders: boolean,
    serviceCalls: boolean
  };
}

export const UpdateRestaurant = (restaurant: UpdateRestaurantBody): Promise<any> => Patch({
  path: `restaurants/${restaurant.id}`
}, restaurant);

export const UploadRestaurantImage = ({ file, id }: any): Promise<any> => PostImage({
  path: `restaurants/${id}/images`
}, {
  file
});

export const FavRestaurant = ({ restaurantId, fav }: any): Promise<any> => Post({
  path: `restaurants/${restaurantId}/favorite`
}, { fav });


export const GetFavRestaurants = (): Promise<any> => Get({
  path: `restaurants/favorites`
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
  path: `restaurants/${restaurantId}/menuCategories`,
  lang
});

export const CreateMenuCategory = (body: any): Promise<any> => Post({
  path: `menuCategories`
}, body);

export const UpdateMenuCategory = (category: any): Promise<any> => {
  const { id } = category;
  delete category.id;
  return Patch({
    path: `menuCategories/${id}`
  }, category);
}

export const RemoveMenuCategory = ({ id }: any): Promise<any> => Delete({
  path: `menuCategories/${id}`
});

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

export const RemoveMenuItem = (menuItemId: string): Promise<any> => Delete({
  path: `menuItems/${menuItemId}`
});

export const UploadMenuItemImage = ({ file, id }: any): Promise<any> => PostImage({
  path: `menuItems/${id}/images`
}, {
  file
});

export const GetFavMenuItems = (): Promise<any> => Get({
  path: `menuItems/favorites`
});

export const FavMenuItem = ({ menuItemId, fav }: any): Promise<any> => Post({
  path: `menuItems/${menuItemId}/favorite`
}, { fav });

export const AssignIngredient = (menuItemId: string, body: any) => Post({
  path: `menuItems/${menuItemId}/ingredients`
}, body);

export const UnassignIngredient = (menuItemId: string, body: any) => Delete({
  path: `menuItems/${menuItemId}/ingredients/${body.ingredientId}`
});

export const UpdateMenuItemIngredient = (menuItemId: string, ingredientId: string, body: any): Promise<any> => Patch({
  path: `menuItems/${menuItemId}/ingredients/${ingredientId}`
}, body);

export const AssignAddon = (menuItemId: string, body: any) => Post({
  path: `menuItems/${menuItemId}/addons`
}, body);

export const UnassignAddon = (menuItemId: string, body: any) => Delete({
  path: `menuItems/${menuItemId}/addons/${body.addonId}`
});

export const AssignOption = (menuItemId: string, body: any) => Post({
  path: `menuItems/${menuItemId}/options`
}, body);

export const UnassignOption = (menuItemId: string, body: any) => Delete({
  path: `menuItems/${menuItemId}/options/${body.optionId}`
});

export const GetRestaurantIngredients = ({ restaurantId }: any, lang?: string): Promise<any> => Get({
  path: `restaurants/${restaurantId}/ingredients`,
  lang
});

export const CreateIngredient = (body: any): Promise<any> => Post({
  path: `ingredients`
}, body);

export const RemoveIngredient = ({ id }: any) => {
  return Delete({ path: `ingredients/${id}` });
}

export const GetRestaurantAddons = ({ restaurantId }: any, lang?: string): Promise<any> => Get({
  path: `restaurants/${restaurantId}/addons`,
  lang
});

export const CreateAddon = (body: any): Promise<any> => Post({
  path: `addons`
}, body);

export const RemoveAddon = ({ id }: any) => {
  return Delete({ path: `addons/${id}` });
}

export const GetRestaurantOptions = ({ restaurantId }: any, lang?: string): Promise<any> => Get({
  path: `restaurants/${restaurantId}/options`,
  lang
});

export const CreateOption = (body: any): Promise<any> => Post({
  path: `options`
}, body);

export const RemoveOption = ({ id }: any): Promise<any> => Delete({
  path: `options/${id}`
});

export const CreateChoice = (body: any): Promise<any> => Post({
  path: `choices`
}, body);

export const RemoveChoice = ({ id }: any): Promise<any> => Delete({
  path: `choices/${id}`
});

type NotifyBody = {
  sendTo: string | string[];
  type: string;
  payload: any;
}

export const Notify = ({ sendTo, type, payload }: NotifyBody) => {
  return Post(
    {
      endpoint: 'https://ws.dinify.app/',
      path: `notify`
    },
    { sendTo, type, payload },
  );
}

export const ReportCampaignAction = ({
  token,
  status,
  type = 'default',
  campaign = 'default'
}: any) => {
  return Post({
    endpoint: 'https://europe-west1-dinify.cloudfunctions.net/',
    path: 'reportCampaignAction'
  }, {
    token,
    status,
    type,
    campaign
  });
}

export const AddTranslation = ({ type, id, locale, name, description, restaurantId }: any) => {
  const body: any = { type, id, locale, name };
  if (description) body.description = description;
  return Post({ path: `restaurant/${restaurantId}/translation/add` }, body);
}

export const TranslateAll = ({ restaurantId }: any) => {
  return Post({ path: `restaurant/${restaurantId}/menu/translate/all` });
}

export const GetServiceImages = (): Promise<any> => Get({
  path: `images?scopes=services`
});
