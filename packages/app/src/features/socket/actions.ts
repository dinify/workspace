import { createAction } from 'typesafe-actions';
import { Call } from 'ServiceModels';

const p = 'dinify/ws';

export const splitAction = createAction(`${p}/SPLIT`)<any>();

export const seatsAction = createAction(`${p}/SEATS`)<any>();

export const checkinAction = createAction(`${p}/CHECKIN`)<any>();

export const checkoutAction = createAction(`${p}/CHECKOUT`)<any>();

export const checkoutAllAction = createAction(`${p}/CHECKOUT_ALL`)<any>();

export const confirmedPaymentAction = createAction(`${p}/CONFIRMED_PAYMENT`)<any>();

export const confirmedOrderAction = createAction(`${p}/CONFIRMED_ORDER`)<any>();

export const confirmedCallAction = createAction(`${p}/CONFIRMED_CALL`)<{ call: Call }>();
