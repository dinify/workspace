import { createAsyncAction, createStandardAction } from 'typesafe-actions';

const p = 'dinify/seat';

export const seatReceivedAction = createStandardAction(`${p}/SEAT_RECEIVED`)<any>();

export const fetchSeatsAsync = createAsyncAction(
  `${p}/GET_SEATS_INIT`,
  `${p}/GET_SEATS_DONE`,
  `${p}/GET_SEATS_FAIL`,
)<undefined, any, any>();
