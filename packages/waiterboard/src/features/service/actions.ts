import { createAsyncAction } from 'typesafe-actions';

const p = 'dinify/service';

export const fetchServicesAsync = createAsyncAction(
  `${p}/GET_SERVICES_INIT`,
  `${p}/GET_SERVICES_DONE`,
  `${p}/GET_SERVICES_FAIL`,
)<any, any, any>();
