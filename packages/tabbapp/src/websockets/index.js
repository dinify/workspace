// @flow
import io from 'socket.io-client';
import { showSnackbar } from 'ducks/notifications/actions';
import types from './types';

const socket = io('https://downstream.tabb.global');

const websockets = (store) => {
  const { dispatch, getState } = store;

  const initSocket = () => {
    const loggedUserId = getState().user.loggedUserId;
    if (loggedUserId) socket.emit('init', `user/${loggedUserId}`);
  }
  window.initSocket = initSocket;

  socket.on('connect', () => {
    console.log('Socket.io connected');
    initSocket();
  });

  socket.on('transaction-status', (data) => {
    const me = data.transaction.initiator === getState().user.loggedUserId;
    if (data.transaction.status === 'PROCESSED') {
      dispatch({ type: types.CONFIRMED_PAYMENT, payload: data });
      if (me) dispatch(showSnackbar({ message: 'Payment confirmed' }))
    }
    else if (me) dispatch(showSnackbar({ message: 'Payment cancelled' }))
  });

  socket.on('order-status', (data) => {
    dispatch({ type: types.CONFIRMED_ORDER, payload: data });
    if (data.order.initiator === getState().user.loggedUserId) {
      dispatch(showSnackbar({ message: 'Order confirmed' }))
    }
  });

  socket.on('checkin', (data) => {
    dispatch({ type: types.CHECKIN, payload: data });
    dispatch(showSnackbar({ message: 'New guest joined table' }))
  });

  socket.on('checkout', (data) => {
    if (data.seat.user_id === getState().user.loggedUserId) {
      dispatch({ type: types.CHECKOUT_ALL, payload: data });
      dispatch(showSnackbar({ message: 'You have been checked out from the table.' }));
    }
    else {
      dispatch({ type: types.CHECKOUT, payload: data });
      dispatch(showSnackbar({ message: 'Guest left table' }));
    }
  });

  socket.on('checkout-all', (data) => {
    dispatch({ type: types.CHECKOUT_ALL, payload: data });
    dispatch(showSnackbar({ message: 'You have been checked out from the table.' }));
  });

  socket.on('seats', (data) => {
    dispatch({ type: types.SEATS, payload: data });
  });

  socket.on('split', (data) => {
    dispatch({ type: types.SPLIT, payload: data });
    dispatch(showSnackbar({ message: 'Bill received split items' }))
  });

}

export default websockets;
