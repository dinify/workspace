import * as types from './types';

export const confirmOrderInit = (payload) => ({
  type: types.ORDER_CONFIRMATION_INIT,
  payload
});
