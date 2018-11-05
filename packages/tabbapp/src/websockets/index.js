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

  socket.on('payment-confirmed', (data) => {
    dispatch({ type: types.CONFIRMED_PAYMENT, payload: data });
  })

  socket.on('order-status', (data) => {
    dispatch({ type: types.CONFIRMED_ORDER, payload: data });
  })

}

export default websockets;
