import { createAsyncAction } from 'typesafe-actions';
import { Geolocation } from 'UserModels';
const p = 'dinify/user';

export const getGeolocationAsync = createAsyncAction(
  `${p}/GET_GEOLOCATION_INIT`,
  `${p}/GET_GEOLOCATION_DONE`,
  `${p}/GET_GEOLOCATION_FAIL`,
)<undefined, Geolocation, any>();
