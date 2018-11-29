// @flow
import io from 'socket.io-client';
import types from './types';
import orderTypes from 'ducks/order/types';
import billTypes from 'ducks/bill/types';
import callTypes from 'ducks/call/types';

const socket = io('https://downstream.tabb.global');

const chime = new Audio('/static/GLASS.wav');

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

  socket.on('checkin', (payload) => {
    console.log('checkin', payload);
    const userId = payload.seat.user_id;
    dispatch({ type: 'FETCHALL_USER_INIT', payload: {ids: [userId], cache: true} });
    dispatch({ type: 'SEAT_RECEIVED', payload });
  })

  socket.on('checkout', (data) => {
    console.log('checkout', data);
    dispatch({ type: 'LOAD_SEATS_INIT'});
  })

  socket.on('order-incoming', (payload) => {
    const userId = payload.order.initiator;
    dispatch({ type: 'FETCHALL_USER_INIT', payload: {ids: [userId], cache: true} });
    dispatch({ type: orderTypes.ORDER_RECEIVED, payload });
    chime.play();
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
    chime.play();
  })

  socket.on('call-incoming', (payload) => {
    // console.log('call-incoming', data);
    dispatch({ type: callTypes.CALL_RECEIVED, payload });
    const userId = payload.call.user_id;
    dispatch({ type: 'FETCHALL_USER_INIT', payload: {ids: [userId], cache: true} });
    chime.play();
  })

  socket.on('booking-incoming', (data) => {
    console.log('booking-incoming', data);
    chime.play();
  })

}

export default websockets;
