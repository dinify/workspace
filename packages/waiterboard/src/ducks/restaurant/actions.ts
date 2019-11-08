import { createAsyncAction } from 'typesafe-actions';

const p = 'dinify/restaurant';

export const fetchManagedAsync = createAsyncAction(
  `${p}/GET_MANAGED_INIT`,
  `${p}/GET_MANAGED_DONE`,
  `${p}/GET_MANAGED_FAIL`,
)<undefined, any, any>();
