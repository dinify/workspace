// @flow
import { Get, Post } from './Network';

export function GetRestaurants() {
  return Get({ path: `restaurant/list` });
}

type GetCategoriesArgs = { restaurantId: string };

export function GetMenucategories({ restaurantId }: GetCategoriesArgs) {
  return Get({ path: `restaurant/${restaurantId}/categories` });
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
