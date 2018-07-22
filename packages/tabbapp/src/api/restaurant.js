// @flow
import { Get, Post } from './Network';

export function GetRestaurants() {
  return Get({ path: `restaurant/list?with=images,tags` });
}

type GetRestaurantById = { id: string, subdomain?: null };
type GetRestaurantBySubdomain = { id?: null, subdomain: string };

export function GetRestaurant({ subdomain }: GetRestaurantById | GetRestaurantBySubdomain) {
  return Get({ path: `restaurant/${subdomain}?with=images,tags` });
}

type GetCategoriesArgs = { subdomain: string };
const populateCategoriesWith = [
  'categories.items.images',
  'categories.items.addons.price',
  'categories.items.ingredients',
  'categories.items.options.choices',
].join(',');
export function GetMenucategories({ subdomain }: GetCategoriesArgs) {
  return Get({ path: `restaurant/${subdomain}/categories?with=${populateCategoriesWith}` });
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
  return Post({ path: `checkin?with=restaurant` }, payload);
}

export function GetStatus() {
  return Get({ path: `status?with=table,restaurant` });
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

export function Order() {
  return Post({ path: 'order' }, { type: 'DINE_IN' })
}

export function GetBill() {
  return Get({ path: 'bill?with=addons,choices,excludes,menu_item.images' })
}

export function GetSeats() {
  return Get({ path: 'seat/list'})
}
