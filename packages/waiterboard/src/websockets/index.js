import io from 'socket.io-client';

import * as commonTypes from 'features/common/types';
import { fetchAllUsersAsync } from 'features/user/actions';
import { seatReceivedAction, fetchSeatsAsync } from '../features/seat/actions';
import { orderReceivedAction } from '../features/order/actions';
import { billReceivedAction } from '../features/bill/actions';
import { callReceivedAction } from '../features/call/actions';
// import * as types from './types';

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
    
    const userId = payload.seat.userId;
    dispatch(fetchAllUsersAsync.request({ ids: [userId], cache: true }));

    dispatch(seatReceivedAction(payload));

    playChime();
  })

  socket.on('seat-change', (payload) => {
    console.log(payload);
  })

  socket.on('checkout', (data) => {
    console.log('checkout', data);
    dispatch(fetchSeatsAsync.request());
  })

  socket.on('order-incoming', (payload) => {
    console.log('order-incoming', payload);

    const userId = payload.order.initiator;
    dispatch(fetchAllUsersAsync.request({ ids: [userId], cache: true }));
    
    dispatch(orderReceivedAction(payload));

    playChime();
  })

  socket.on('transaction-incoming', (payload) => {
    console.log('transaction-incoming', payload);

    const userId = payload.trasaction.initiator;
    dispatch(fetchAllUsersAsync.request({ ids: [userId], cache: true }));

    dispatch(billReceivedAction(payload.trasaction));

    playChime();
  })

  socket.on('call-incoming', (payload) => {
    console.log('call-incoming', payload);

    const userId = payload.call.userId;
    dispatch(fetchAllUsersAsync.request({ ids: [userId], cache: true }));
    dispatch(callReceivedAction(payload));

    playChime();
  })

  socket.on('booking-incoming', (data) => {
    console.log('booking-incoming', data);
    playChime();
  })

  socket.on('confirmation', (data) => {
    if (data.instanceId !== document.instanceId) {
      dispatch({
        type: commonTypes.CONFIRMATION_DONE,
        payload: {
          stopPropagation: true,
          ...data
        }
    });
    }
  })

}

export default websockets;
