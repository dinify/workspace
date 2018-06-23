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

export function GetMenucategories({ subdomain }: GetCategoriesArgs) {
  return Get({ path: `restaurant/${subdomain}/categories` });
}

type CheckinWithQr = { qr: string, code?: null };
type CheckinWithCode = { qr?: null, code: string };

export function Checkin({ qr, code }: CheckinWithQr | CheckinWithCode) {
  const payload = {}
  if (qr) payload.qr = qr
  if (code) payload.code = code
  return Post({ path: `checkin` }, payload);
}

export function GetStatus() {
  return Get({ path: `status` });
}

export function FavRestaurant({ id }) {
  return Post({ path: `restaurant/${id}/favorite/toggle` });
}
