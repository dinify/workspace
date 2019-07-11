import { Get, Post, PostMultipart } from './Network';

const googleFunctionsEndpoint = 'https://europe-west1-dinify.cloudfunctions.net/';

export function GetRestaurants({ populateWith }) {
  let populateQuery = '';
  if (populateWith) populateQuery = `&with=${populateWith}`;
  else populateQuery = `&with=images,tags,services.image`;
  return Get({ path: `restaurant/list?limit=100${populateQuery}` });
}

export function GetRestaurant({ subdomain, restaurantId }) {
  const id = subdomain || restaurantId;
  return Get({ path: `restaurant/${id}?with=images,tags,services.image` });
}

const populateCategoriesWith = [
  'categories.items.images',
  'categories.items.addons.price',
  'categories.items.ingredients',
  'categories.items.options.choices',
].join(',');
export function GetMenucategories({ subdomain, populateWith }) {
  let populateQuery = '';
  
  if (populateWith) populateQuery = `&with=${populateWith}`;
  else populateQuery = `&with=${populateCategoriesWith}`;

  return Get({ path: `restaurant/${subdomain}/categories?limit=100${populateQuery}` });
}

export function GetMenuitems({ categoryId }) {
  return Get({ path: `menu/category/${categoryId}/items` });
}

export function GetMenuitem({ id }) {
  return Get({ path: `menu/item/${id}?with=images,addons.price,ingredients,options.choices` });
}

export function Checkin({ qr, code }) {
  const payload = {}
  if (qr) payload.qr = qr
  if (code) payload.code = code
  return Post({ path: `checkin?with=table` }, payload);
}

export function GetStatus() {
  return Get({ path: `table/status` });
}

export function FavRestaurant({ id, fav }) {
  return Post({ path: `restaurant/${id}/favorite` }, { favorite: fav });
}

export function FavMenuitem({ id, fav }) {
  return Post({ path: `menu/item/${id}/favorite` }, { favorite: fav });
}

export function GetCart() {
  return Get({ path: `cart?with=addons.price,excludes,choices.difference,menu_item.images` });
}

export function AddToCart({ menuItemId, choices, excludes, addons }) {
  return Post({ path: `menu/item/${menuItemId}/cart/add` },
    {
    	choices, excludes, addons
    }
  );
}

export function RemoveOrderitem({ orderItemId }) {
  return Post({ path: `order/item/${orderItemId}/delete` });
}

export function Order({ orderType = 'DINE_IN' }) {
  return Post({ path: 'order' }, { type: orderType })
}

export function GetBill() {
  return Get({ path: 'bill?with=addons,choices,excludes,menu_item.images' })
}

export function GetReceipt() {
  return Get({ path: 'receipt/latest?with=seat.bill.items.order_item.menu_item.images' })
}

export function GetSeats() {
  return Get({ path: 'seat/list?with=addons,choices,excludes,menu_item.images'})
}

export function SplitMultiple({ orderItems, withIds }) {
  return Post({ path: `bill/split` }, { order_items: orderItems, with: withIds });
}

export function TransferBill({ itemId, userId }) {
  return Post({ path: `order/item/${itemId}/split` }, { to: userId });
}

export function InitiateTransaction({ type, gratuity }) {
  return Post({ path: `transaction/initiate` }, { type, gratuity });
}

export function CallService({ serviceId }) {
  return Post({ path: `service/${serviceId}/call` });
}

export function GetServiceimages() {
  return Get({ path: `service/images?limit=100` });
}

export function ChangeCategory({ restaurantId, category }) {
  return Post(
    { path: `restaurant/${restaurantId}`},
    {
      type: category,
    },
  );
}

export function ChangeName({ name, restaurantId }) {
  return Post({ path: `restaurant/${restaurantId}`}, { name });
}

export function ChangePublished({ published, restaurantId }) {
  return Post({ path: `restaurant/${restaurantId}`}, { published });
}

export function ChangeContact({ phone, email, website, restaurantId }) {
  return Post(
    { path: `restaurant/${restaurantId}`},
    {
      contact: {
        phone,
        email,
        website,
      },
    },
  );
}

export function ChangeBank({ bank_name, beneficiary_name, iban, bic, restaurantId }) {
  return Post(
    { path: `restaurant/${restaurantId}/payout` },
    {
      bank_name,
      beneficiary_name,
      iban,
      bic,
    },
  );
}

export function ChangeAddress(payload) {
  const restaurantId = payload.restaurantId;
  delete payload.restaurantId;
  return Post(
    { path: `restaurant/${restaurantId}` },
    {
      address: {
        business: { ...payload },
      },
    },
  );
}

export function ChangeSocial({ facebook, instagram, restaurantId }) {
  return Post(
    { path: `restaurant/${restaurantId}` },
    {
      social: {
        facebook,
        instagram,
      },
    },
  );
}

export function ChangeLocation({ longitude, latitude, restaurantId }) {
  return Post(
    { path: `restaurant/${restaurantId}` },
    {
      longitude: longitude,
      latitude: latitude,
    },
  );
}

export function ChangeHours(payload) {
  const restaurantId = payload.restaurantId;
  delete payload['restaurantId'];
  const openHours = payload;
  return Post({ path: `restaurant/${restaurantId}` }, { open_hours: openHours });
}

//export function AddTablet({ restaurantId, login_id, pass_enc, name }) {
//  return Post({ path: `restaurant/${restaurantId}/shop` }, { login_id, pass_enc, name })
//}

export function CreateRestaurant({ restaurantName, subdomain, language, token }) {
  return Post(
    {
      path: 'restaurant/create'
    },
    {
      name: restaurantName,
      subdomain,
      language,
      token
    },
  );
}

export function CreateWaiterboard({ restaurantId, name }) {
  return Post({ path: `restaurant/${restaurantId}/waiterboard/add` }, { name });
}

export function RemoveWaiterboard({ id }) {
  return Post({ path: `waiterboard/${id}/delete` }, { id });
}

export function CreateTable({ number, capacity, waiterboardId, x, y }) {
  return Post(
    { path: `waiterboard/${waiterboardId}/table/add` },
    { number, capacity, x, y },
  );
}
export function ChangeTable({ id, x, y }) {
  return Post({ path: `table/${id}` }, { x, y });
}

export function RemoveTable({ id }) {
  return Post({ path: `table/${id}/delete` });
}

// export function GetBills({ from, to }) {
//   return Post({ path: `api/v2/restaurant/billing`, v2: true }, { from, to });
// }

export function GetCategories({ restaurantId }) {
  return Get({ path: `restaurant/${restaurantId}/categories` });
}
export function CreateMenucategory({ restaurantId, name, precedence }) {
  return Post({ path: `restaurant/${restaurantId}/menu/category/add` }, { name, precedence });
}
export function ChangeMenucategory(payload) {
  const { id } = payload;
  delete payload.restaurantId;
  delete payload.id;
  return Post({ path: `menu/category/${id}` }, payload);
}
export function RemoveMenucategory({ id }) {
  return Post({ path: `menu/category/${id}/delete` });
}

export function CreateMenuitem({ name, precedence, categoryId }) {
  return Post(
    { path: `menu/category/${categoryId}/item/add` },
    {
      name,
      precedence,
      price: {
        amount: 10,
        currency: 'CZK',
      },
    },
  );
}
export function ChangeMenuitem(payload) {
  const id = payload.id;
  let updObj = payload;
  delete updObj.id;
  //updObj = R.filter(R.identity)(updObj);
  return Post({ path: `menu/item/${id}` }, updObj);
}
export function RemoveMenuitem({ id }) {
  return Post({ path: `menu/item/${id}/delete` });
}


export function CreateService({ restaurantId, name, imageId, type }) {
  return Post(
    { path: `restaurant/${restaurantId}/service/add` },
    { name, image_id: imageId, type },
  );
}

export function RemoveService({ id }) {
  return Post({ path: `service/${id}/delete` });
}

export function ChangeNutrition({ foodId, total, proteins, fats, carbs }) {
  return Post(
    { path: `menu/item/${foodId}` },
    {
      calories: {
        total,
        proteins,
        fats,
        carbs,
      },
    },
  );
}

export function ToggleCategory({ categoryId, enabled }) {
  return Post(
    { path: `menu/category/${categoryId}` },
    { published: enabled },
  );
}
export function ToggleFood({ foodId, enabled }) {
  return Post(
    { path: `menu/item/${foodId}` },
    { published: enabled },
  );
}

export function GetAddons({ restaurantId }) {
  return Get({ path: `restaurant/${restaurantId}/addons` });
}

export function CreateAddon({ restaurantId, name, price }) {
  return Post({ path: `restaurant/${restaurantId}/menu/addon/add` }, {
    name,
    price: {
      amount: price,
      currency: 'CZK'
    }
  });
}

export function RemoveAddon({ id }) {
  return Post({ path: `menu/addon/${id}/delete` });
}

export function CreateIngredient({ restaurantId, name }) {
  return Post({ path: `restaurant/${restaurantId}/menu/ingredient/add` }, { name });
}

export function ChangeIngredient(payload) {
  const id = payload.id;
  delete payload.id;
  return Post({ path: `menu/ingredient/${id}` }, payload);
}

export function RemoveIngredient({ id }) {
  return Post({ path: `menu/ingredient/${id}/delete` });
}

export function CreateOption({ restaurantId, name }) {
  return Post({ path: `restaurant/${restaurantId}/menu/option/add` }, { name });
}

export function RemoveOption({ id }) {
  return Post({ path: `menu/option/${id}/delete` });
}

export function CreateChoice({ name, price, optionId }) {
  return Post(
    { path: `menu/option/${optionId}/choice/add` },
    {
      name,
      difference: {
        amount: price,
        currency: "CZK"
      }
    },
  );
}

export function RemoveChoice({ id }) {
  return Post({ path: `menu/choice/${id}/delete` });
}

export function ChangeItemimage({ file, id }) {
  return PostMultipart(
    { path: `menu/item/${id}/image/upload` },
    { image: file },
  );
}

export function ChangeImage({ file, restaurantId }) {
  return PostMultipart(
    { path: `restaurant/${restaurantId}/image/upload` },
    { image: file },
  );
}

export function EditImage({ id, precedence, published }) {
  return Post({ path: `image/${id}` }, { precedence, published });
}

export function ChangeFoodingredient({ foodId, ingredients }) {
  return Post({ path: `menu/item/${foodId}` }, { ingredients });
}

export function GetTranslations({ locale, restaurantId } = {}) {
  if (locale) return Get({ path: `restaurant/${restaurantId}/translation/list/${locale}` });
  return Get({ path: `restaurant/${restaurantId}/translation/list` });
}

export function AddTranslation({ type, id, locale, name, description, restaurantId }) {
  const body = { type, id, locale, name };
  if (description) body.description = description;
  return Post({ path: `restaurant/${restaurantId}/translation/add` }, body);
}

export function RmTranslation({ type, id, locale, restaurantId }) {
  return Post({ path: `restaurant/${restaurantId}/translation/remove` }, { type, id, locale });
}

export function Notify({ sendTo, type, payload }) {
  return Post(
    {
      endpoint: 'https://ws.dinify.app/',
      path: `notify`
    },
    { sendTo, type, payload },
  );
}

export function GetLoggedrestaurant({ restaurantId }) {
  return Get({ path: `restaurant/${restaurantId}/all?with=images` });
}

export function GetRestaurantwaiterboards({ restaurantId }) {
  return Get({ path: `restaurant/${restaurantId}/waiterboards?with=waiterboards.tables` });
}

export function GetRestaurantingredients({ restaurantId }) {
  return Get({ path: `restaurant/${restaurantId}/ingredients` });
}

export function GetRestaurantaddons({ restaurantId }) {
  return Get({ path: `restaurant/${restaurantId}/addons` });
}

export function GetRestaurantoptions({ restaurantId }) {
  return Get({ path: `restaurant/${restaurantId}/options?with=options.choices` });
}

export function GetRestaurantsettings({ restaurantId }) {
  return Get({ path: `restaurant/${restaurantId}/settings` });
}

export function GetTables({ waiterboardId }) {
  return Get({ path: `waiterboard/${waiterboardId}/tables` });
}

export function GetSeatsOfWB({ waiterboardId }) {
  return Get({ path: `waiterboard/${waiterboardId}/seats/all` });
}

export function CheckOut({ tableId }) {
  return Post({ path: `table/${tableId}/checkout` });
}

export function CheckOutUser({ userId }) {
  return Post({ path: `checkout/user/${userId}` });
}

export function GetBookings({ restaurantId }) {
  return Get({ path: `restaurant/${restaurantId}/bookings` });
}

export function ConfirmBooking({ id }) {
  return Post({ path: `booking/${id}/confirm` });
}

export function CancelBooking({ id }) {
  return Post({ path: `booking/${id}/cancel` }, { reason: 'No seats at given time' });
}

export function GetGuests({ waiterboardId }) {
  return Get({ path: `waiterboard/${waiterboardId}/guests` })
}

export function GetCalls({ waiterboardId }) {
  return Get({ path: `waiterboard/${waiterboardId}/calls?with=service.image` });
}

export function ConfirmCall({ callId }) {
  return Post({ path: `service/call/${callId}/confirm` });
}

export function GetOrders({ waiterboardId }) {
  return Get({ path: `waiterboard/${waiterboardId}/orders/today?with=items.choices,items.addons,items.excludes` });
}

export function ConfirmOrder({ orderId }) {
  return Post({ path: `order/${orderId}/confirm` });
}

export function GetBills({ waiterboardId }) {
  return Get({ path: `waiterboard/${waiterboardId}/transactions?with=orders` });
}

export function GetTodaybills({ waiterboardId }) {
  return Get({ path: `waiterboard/${waiterboardId}/transactions/all?limit=100` });
}

export function ConfirmBill({ billId, approvalNumber }) {
  return Post({ path: `transaction/${billId}/process`}, { approvalNumber });
}

export function GetManagedrestaurants() {
  return Get({ path: 'managed?with=images,waiterboards&limit=100' });
}

export function GetLanguages() {
  return Get({ path: 'languages' });
}

export function GetMenulanguages({ restaurantId }) {
  return Get({ path: `restaurant/${restaurantId}/menu/languages?limit=100` });
}

export function CreateMenulanguage({ restaurantId, language }) { // language = 'de'
  return Post({ path: `restaurant/${restaurantId}/menu/language/add` }, { language });
}

export function TranslateAll({ restaurantId }) {
  return Post({ path: `restaurant/${restaurantId}/menu/translate/all` });
}

export function ReportCampaignAction({
  token,
  status,
  type = 'default',
  campaign = 'default'
}) {
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
