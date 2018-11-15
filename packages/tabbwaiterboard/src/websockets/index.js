// @flow
import io from 'socket.io-client';
import types from './types';
import orderTypes from 'ducks/order/types';
import billTypes from 'ducks/bill/types';

const socket = io('https://downstream.tabb.global');

const websockets = (store) => {
  const { dispatch, getState } = store;

  const initSocket = (selectedId) => {
    let wbId = null;
    if (selectedId) wbId = selectedId;
    else wbId = getState().restaurant.selectedWBId;
    if (wbId) socket.emit('init', `waiterboard/${wbId}`);
  }
  window.initSocket = initSocket;

  socket.on('connect', () => {
    console.log('Socket.io connected');
    initSocket();
  });

  socket.on('seats', (data) => {
    console.log('seats', data);
  })

  socket.on('order-incoming', (payload) => {
    dispatch({ type: orderTypes.ORDER_RECEIVED, payload });
  })

  socket.on('transaction-incoming', (payload) => {
    console.log('transaction-incoming', payload);
    dispatch({
      type: billTypes.PAYMENT_RECEIVED,
      payload: {
        payment: payload.trasaction
      }
    });
  })

  socket.on('booking-incoming', (data) => {
    console.log('booking-incoming', data);
  })

  socket.on('call-incoming', (data) => {
    console.log('call-incoming', data);
  })

  socket.on('order-status', (data) => {
    console.log('order-incoming', data);
  })

  socket.on('transaction-status', (data) => {
    console.log('transaction-status', data);
  })
}

export default websockets;
