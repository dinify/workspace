// @flow
import { Get, Post } from './Network';

export function GetRestaurants() {
  return Get({ path: `restaurant/list?with=images,tags,services.image` });
}

type GetRestaurantById = { id: string, subdomain?: null };
type GetRestaurantBySubdomain = { id?: null, subdomain: string };

export function GetRestaurant({ subdomain }: GetRestaurantById | GetRestaurantBySubdomain) {
  return Get({ path: `restaurant/${subdomain}?with=images,tags,services.image` });
}

type GetCategoriesArgs = { subdomain: string };
const populateCategoriesWith = [
  'categories.items.images',
  'categories.items.addons.price',
  'categories.items.ingredients',
  'categories.items.options.choices',
].join(',');
export function GetMenucategories({ subdomain }: GetCategoriesArgs) {
  return Get({ path: `restaurant/${subdomain}/categories?with=${populateCategoriesWith}&limit=100` });
}

type GetMenuitemsArgs = { categoryId: string };

export function GetMenuitems({ categoryId }: GetMenuitemsArgs) {
  return Get({ path: `menu/category/${categoryId}/items` });
}

type GetMenuitemArgs = { id: string };

export function GetMenuitem({ id }: GetMenuitemArgs) {
  return Get({ path: `menu/item/${id}?with=images,addons.price,ingredients,options.choices` });
}

type CheckinWithQr = { qr: string, code?: null };
type CheckinWithCode = { qr?: null, code: string };

export function Checkin({ qr, code }: CheckinWithQr | CheckinWithCode) {
  const payload = {}
  if (qr) payload.qr = qr
  if (code) payload.code = code
  return Post({ path: `checkin?with=table` }, payload);
}

export function GetStatus() {
  return Get({ path: `table/status` });
}

type FavRestaurantArgs = { id: string, fav: boolean  };

export function FavRestaurant({ id, fav }: FavRestaurantArgs) {
  return Post({ path: `restaurant/${id}/favorite` }, { favorite: fav });
}

type FavMenuitemArgs = { id: string, fav: boolean  };

export function FavMenuitem({ id, fav }: FavMenuitemArgs) {
  return Post({ path: `menu/item/${id}/favorite` }, { favorite: fav });
}

export function GetCart() {
  return Get({ path: `cart?with=addons.price,excludes,choices.difference,menu_item.images` });
}

type AddToCartArgs = {
  menuItemId: string,
  choices: array,
  excludes?: array,
  addons?: array,
};

export function AddToCart({ menuItemId, choices, excludes, addons }: AddToCartArgs) {
  return Post({ path: `menu/item/${menuItemId}/cart/add` },
    {
    	choices, excludes, addons
    }
  );
}

type RmFromCartArgs = {
  orderItemId: string,
};
export function RemoveOrderitem({ orderItemId }: RmFromCartArgs) {
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

type SplitMultipleArgs = {
  orderItems: array,
  withIds: array
};
export function SplitMultiple({ orderItems, withIds }: SplitMultipleArgs) {
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



export function ChangeCategory({ category }) {
  return Post(
    { path: `restaurant/my`},
    {
      type: category,
    },
  );
}

export function ChangeName({ name }) {
  return Post({ path: `restaurant/my`}, { name });
}

export function ChangeContact({ phone, email, website }) {
  return Post(
    { path: `restaurant/my`},
    {
      contact: {
        phone,
        email,
        website,
      },
    },
  );
}

export function ChangeBank({ bank_name, beneficiary_name, iban, bic }) {
  return Post(
    { path: `restaurant/my/payout` },
    {
      bank_name,
      beneficiary_name,
      iban,
      bic,
    },
  );
}

export function ChangeAddress(payload) {
  delete payload.restaurantId;
  return Post(
    { path: `restaurant/my` },
    {
      address: {
        business: { ...payload },
      },
    },
  );
}

export function ChangeSocial({ facebook, instagram }) {
  return Post(
    { path: `restaurant/my` },
    {
      social: {
        facebook,
        instagram,
      },
    },
  );
}

export function ChangeLocation({ longitude, latitude }) {
  return Post(
    { path: `restaurant/my` },
    {
      longitude: longitude,
      latitude: latitude,
    },
  );
}

export function ChangeHours(payload) {
  delete payload['restaurantId'];
  const openHours = payload;
  return Post({ path: `restaurant/my` }, { open_hours: openHours });
}

//export function AddTablet({ restaurantId, login_id, pass_enc, name }) {
//  return Post({ path: `restaurant/${restaurantId}/shop` }, { login_id, pass_enc, name })
//}

export function CreateWaiterboard({ name }) {
  return Post({ path: `waiterboard/create` }, { name });
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

export function GetCategories() {
  return Get({ path: `restaurant/my/categories` });
}
export function CreateMenucategory({ name, precedence }) {
  return Post({ path: `menu/category/create` }, { name, precedence });
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
        amount: 2,
        currency: 'KWD',
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


export function CreateService({ name, imageId, type }) {
  return Post(
    { path: `service/create` },
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

export function GetAddons() {
  return Get({ path: `restaurant/my/addons` });
}

export function CreateAddon({ name, price }) {
  return Post({ path: `menu/addon/create` }, {
    name,
    price: {
      amount: price,
      currency: 'KWD'
    }
  });
}

export function RemoveAddon({ id }) {
  return Post({ path: `menu/addon/${id}/delete` });
}

export function CreateIngredient({ name }) {
  return Post({ path: `menu/ingredient/create` }, { name });
}

export function ChangeIngredient(payload) {
  const id = payload.id;
  delete payload.id;
  return Post({ path: `menu/ingredient/${id}` }, payload);
}

export function RemoveIngredient({ id }) {
  return Post({ path: `menu/ingredient/${id}/delete` });
}

export function CreateOption({ name }) {
  return Post({ path: `menu/option/create` }, { name });
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
        currency: "KWD"
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

export function ChangeImage({ file }) {
  return PostMultipart(
    { path: `restaurant/my/image/upload` },
    { image: file },
  );
}

export function EditImage({ id, precedence, published }) {
  return Post({ path: `image/${id}` }, { precedence, published });
}

export function ChangeFoodingredient({ foodId, ingredients }) {
  return Post({ path: `menu/item/${foodId}` }, { ingredients });
}

export function GetTranslations({ locale } = {}) {
  if (locale) return Get({ path: `translation/list/${locale}` });
  return Get({ path: 'translation/list' });
}

export function AddTranslation({ type, id, locale, name, description }) {
  const body = { type, id, locale, name };
  if (description) body.description = description;
  return Post({ path: 'translation/add' }, body);
}

export function RmTranslation({ type, id, locale }) {
  return Post({ path: 'translation/remove' }, { type, id, locale });
}