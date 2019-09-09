
import io from 'socket.io-client';
import { snackbarActions as snackbar } from 'material-ui-snackbar-redux'
import types from './types';

const socket = io('https://ws.dinify.app');

const websockets = (store) => {
  const { dispatch, getState } = store;

  const initSocket = () => {
    const auth = getState().firebase.auth;
    if (auth.uid) socket.emit('init', `user/${auth.uid}`);
  }
  window.initSocket = initSocket;

  socket.on('connect', () => {
    initSocket();
  });

  socket.on('transaction-status', (data) => {
    const me = data.transaction.initiator === getState().user.loggedUserId;
    if (data.transaction.status === 'PROCESSED') {
      dispatch({ type: types.CONFIRMED_PAYMENT, payload: data });
      if (me) dispatch(snackbar.show({ message: 'Payment confirmed' }));
    }
    else if (me) dispatch(snackbar.show({ message: 'Payment cancelled' }));
  });

  socket.on('order-status', (data) => {
    console.log(data);
    if (data.order.status === 'CONFIRMED') {
      dispatch({ type: types.CONFIRMED_ORDER, payload: data });
      if (data.order.initiator === getState().user.loggedUserId) {
        dispatch(snackbar.show({ message: 'Order confirmed' }));
      }
    }
    else if (data.order.status === 'CANCELLED') {
      if (data.order.initiator === getState().user.loggedUserId)
        dispatch(snackbar.show({ message: 'Your order was cancelled' }));
    }
  });

  socket.on('call-status', (data) => {
    if (data.call.status === 'CONFIRMED') {
      dispatch({ type: types.CONFIRMED_CALL, payload: data });
      dispatch(snackbar.show({ message: `${data.call.service.name} is on its way!` }));
    }
    else if (data.call.status === 'CANCELLED') {
      dispatch(snackbar.show({ message: `${data.call.service.name} cannot make it to your table` }));
    }
  });

  socket.on('checkin', (data) => {
    const me = data.seat.user_id === getState().firebase.auth.uid;
    data.me = me;
    dispatch({ type: types.CHECKIN, payload: data });
    if (!me) dispatch(snackbar.show({ message: 'New guest joined table' }))
  });

  socket.on('checkout', (data) => {
    if (data.seat.user_id === getState().user.loggedUserId) {
      dispatch({ type: types.CHECKOUT_ALL, payload: data });
      dispatch(snackbar.show({ message: 'You have been checked out from the table.' }));
    }
    else {
      dispatch({ type: types.CHECKOUT, payload: data });
      dispatch(snackbar.show({ message: 'Guest left table' }));
    }
  });

  socket.on('checkout-all', (data) => {
    dispatch({ type: types.CHECKOUT_ALL, payload: data });
    dispatch(snackbar.show({ message: 'You have been checked out from the table.' }));
  });

  socket.on('seats', (data) => {
    console.log(data);
    dispatch({ type: types.SEATS, payload: data });
  });

  socket.on('split', (data) => {
    dispatch({ type: types.SPLIT, payload: data });
    dispatch(snackbar.show({ message: 'Bill received split items' }))
  });

}

export default websockets;
