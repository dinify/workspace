import { createAction } from 'typesafe-actions';

const p = 'dinify/ws';

export const splitAction = createAction(
  `${p}/SPLIT`,
  action => (payload: any) => action(payload)
)();

export const seatsAction = createAction(
  `${p}/SEATS`,
  action => (payload: any) => action(payload)
)();

export const checkinAction = createAction(
  `${p}/CHECKIN`,
  action => (payload: any) => action(payload)
)();

export const checkoutAction = createAction(
  `${p}/CHECKOUT`,
  action => (payload: any) => action(payload)
)();

export const checkoutAllAction = createAction(
  `${p}/CHECKOUT_ALL`,
  action => (payload: any) => action(payload)
)();

export const confirmedPaymentAction = createAction(
  `${p}/CONFIRMED_PAYMENT`,
  action => (payload: any) => action(payload)
)();

export const confirmedOrderAction = createAction(
  `${p}/CONFIRMED_ORDER`,
  action => (payload: any) => action(payload)
)();

export const confirmedCallAction = createAction(
  `${p}/CONFIRMED_CALL`,
  action => (payload: any) => action(payload)
)();
