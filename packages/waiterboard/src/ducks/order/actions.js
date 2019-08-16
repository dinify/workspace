import * as types from './types';

export const confirmCallInit = (payload) => ({
  type: types.ORDER_CONFIRMATION_INIT,
  payload
});
