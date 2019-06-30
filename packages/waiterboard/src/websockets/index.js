import io from 'socket.io-client';
import orderTypes from 'ducks/order/types';
import billTypes from 'ducks/bill/types';
import callTypes from 'ducks/call/types';
import * as types from './types';

const socket = io('https://ws.dinify.app');

const chime = new Audio('/static/GLASS.wav');

const playChime = () => {
  chime.pause();
  chime.currentTime = 0;
  chime.play();
}

document.instanceId = `${(new Date).getTime()}.${Math.floor(Math.random() * 1000)}`;

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

  socket.on('checkin', (payload) => {
    console.log('checkin', payload);
    const userId = payload.seat.user_id;
    dispatch({ type: 'FETCHALL_USER_INIT', payload: {ids: [userId], cache: true} });
    dispatch({ type: 'SEAT_RECEIVED', payload });
    playChime();
  })

  socket.on('checkout', (data) => {
    console.log('checkout', data);
    dispatch({ type: 'LOAD_SEATS_INIT'});
  })

  socket.on('order-incoming', (payload) => {
    const userId = payload.order.initiator;
    dispatch({ type: 'FETCHALL_USER_INIT', payload: {ids: [userId], cache: true} });
    dispatch({ type: orderTypes.ORDER_RECEIVED, payload });
    playChime();
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
    playChime();
  })

  socket.on('call-incoming', (payload) => {
    console.log('call-incoming', payload);
    dispatch({ type: callTypes.CALL_RECEIVED, payload });
    const userId = payload.call.user_id;
    dispatch({ type: 'FETCHALL_USER_INIT', payload: {ids: [userId], cache: true} });
    playChime();
  })

  socket.on('booking-incoming', (data) => {
    console.log('booking-incoming', data);
    playChime();
  })

  socket.on('confirmation', (data) => {
    if (data.instanceId !== document.instanceId) {
      dispatch({
        type: 'CONFIRMATION_DONE',
        payload: {
          stopPropagation: true,
          ...data
        }
    });
    }
  })

}

export default websockets;
