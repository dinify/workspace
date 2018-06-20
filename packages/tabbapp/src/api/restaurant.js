// @flow
import { Get, Post } from './Network';

export function GetRestaurants() {
  return Get({ path: `restaurant/list` });
}

type CheckinWithQr = { qr: string, code?: null }
type CheckinWithCode = { qr?: null, code: string }

export function Checkin({ qr, code }: CheckinWithQr | CheckinWithCode) {
  const payload = {}
  if (qr) payload.qr = qr
  if (code) payload.code = code
  return Post({ path: `checkin` }, payload);
}
