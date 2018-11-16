// @flow
import io from 'socket.io-client';
import types from './types';
import orderTypes from 'ducks/order/types';
import billTypes from 'ducks/bill/types';
import callTypes from 'ducks/call/types';
import R from 'ramda';

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
    console.log('ws connected');
    initSocket();
  });

  socket.on('seats', (data) => {
    console.log('seats', data);
  })

  socket.on('order-incoming', (payload) => {
    const userId = payload.order.initiator;
    dispatch({ type: 'FETCHALL_USER_INIT', payload: {ids: [userId], cache: true} });
    dispatch({ type: orderTypes.ORDER_RECEIVED, payload });
  })

  socket.on('transaction-incoming', (payload) => {
    // console.log('transaction-incoming', payload);
    const userId = payload.trasaction.initiator;
    dispatch({ type: 'FETCHALL_USER_INIT', payload: {ids: [userId], cache: true} });
    dispatch({
      type: billTypes.PAYMENT_RECEIVED,
      payload: {
        payment: payload.trasaction
      }
    });
  })

  socket.on('call-incoming', (payload) => {
    // console.log('call-incoming', data);
    dispatch({ type: callTypes.CALL_RECEIVED, payload });
    const userId = payload.call.user_id;
    dispatch({ type: 'FETCHALL_USER_INIT', payload: {ids: [userId], cache: true} });
  })

  socket.on('booking-incoming', (data) => {
    console.log('booking-incoming', data);
  })

  socket.on('order-status', (data) => {
    console.log('order-incoming', data);
  })

  socket.on('transaction-status', (data) => {
    console.log('transaction-status', data);
  })
}

export default websockets;
