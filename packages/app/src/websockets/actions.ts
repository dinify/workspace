const p = 'dinify/ws';

export const confirmedPayment = (data: any) => ({
  type: `${p}/CONFIRMED_PAYMENT`,
  payload: data
})