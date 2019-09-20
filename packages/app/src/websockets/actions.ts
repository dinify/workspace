import {
  createAction
} from 'typesafe-actions';

const p = 'dinify/ws';

export const confirmedPaymentAction = createAction(`${p}/CONFIRMED_PAYMENT`, action => {
  return (data: any) => action(data);
});

export const checkoutAction = createAction(`${p}/CHECKOUT`, action => {
  return (data: any) => action(data);
});

export const checkoutAllAction = createAction(`${p}/CHECKOUT_ALL`, action => {
  return (data: any) => action(data);
});
