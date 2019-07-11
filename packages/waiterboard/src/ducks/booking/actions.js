import * as types from './types';

export const confirmBookingInit = (payload) => ({
  type: types.CONFIRM_BOOKING_INIT,
  payload
});

export const cancelBookingInit = (payload) => ({
  type: types.CANCEL_BOOKING_INIT,
  payload
});
