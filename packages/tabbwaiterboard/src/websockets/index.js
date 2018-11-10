// @flow
import io from 'socket.io-client';
import types from './types';

const socket = io('https://downstream.tabb.global');

const websockets = (store) => {
  const { dispatch, getState } = store;

  const initSocket = () => {
    const loggedUserId = getState().user.loggedUserId;
    if (loggedUserId) socket.emit('init', loggedUserId);
  }
  window.initSocket = initSocket;

  socket.on('connect', () => {
    console.log('Socket.io connected');
    initSocket();
  });

  socket.on('seats', (data) => {
    console.log('incoming event');
  })

  socket.on('order-incoming', (data) => {
    console.log(data);
    if (data.transaction.status === 'PROCESSED') {
      dispatch({ type: types.CONFIRMED_PAYMENT, payload: data });
    }
  })

  socket.on('transaction-incoming', (data) => {
    dispatch({ type: types.CONFIRMED_ORDER, payload: data });
  })

  socket.on('booking-incoming', (data) => {
    console.log('incoming event');
  })

  socket.on('call-incoming', (data) => {
    console.log('incoming event');
  })

  socket.on('order-status', (data) => {
    console.log('incoming event');
  })

  socket.on('transaction-status', (data) => {
    console.log('incoming event');
  })
}

export default websockets;
