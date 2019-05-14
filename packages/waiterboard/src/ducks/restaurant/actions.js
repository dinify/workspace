import types from './types';


export const selectWaiterboard = ({ id, restaurantId }) => ({
  type: 'SELECT_WAITERBOARD',
  payload: { id, restaurantId }
});


export function appBootstrap() {
  return { type: types.BOOTSTRAP };
}

export function loadStateInit() {
  return { type: 'LOAD_STATE_INIT' };
}

export const confirmService = (payload) => ({ type: 'SERVICE_CONFIRMATION_INIT', payload })
export const confirmOrder = (payload) => ({ type: 'ORDER_CONFIRMATION_INIT', payload })
export const confirmOrderAhead = (payload) => ({ type: 'ORDERAHEAD_CONFIRMATION_INIT', payload })
export const confirmBill = (payload) => ({ type: 'BILL_CONFIRMATION_INIT', payload })

export const confirmationFail = () => ({ type: 'CONFIRMATION_FAIL' })

export const setTimer = (payload) => ({ type: 'SET_TIMER', payload })
export const setOHEnabled = () => ({ type: 'SET_OHENABLED_INIT' })
export const getBillsOfUser = (payload) => ({ type: 'GET_BILLSOFUSER_INIT', payload })
export const getOrdersOfUser = (payload) => ({ type: 'GET_ORDERSOFUSER_INIT', payload })

export const setWBidAction = (id) => {
  const path = window.location.pathname;
  if (path.includes('/board/') && path.length > 20) id = path.replace('/board/','').replace('/','');
  if (id) window.initSocket(id);
  return {
    type: 'SET_WBID',
    payload: { id }
  }
}