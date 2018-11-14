// @flow
import io from 'socket.io-client';
import { showSnackbar } from 'ducks/notifications/actions';
import Fingerprint2 from 'fingerprintjs2';
import types from './types';

const socket = io(process.env.REACT_APP_DOWNSTREAM_URL);

const websockets = (store) => {
  const { dispatch, getState } = store;

  const initSocket = () => {
    const loggedUserId = getState().user.loggedUserId;
    if (loggedUserId) {
      const callback = () => {
        new Fingerprint2().get(fingerprint => {
          const data = {
            user_id: loggedUserId,
            fingerprint
          };
          console.log(data);
          socket.emit('init', data);
        });
      };
      if (window.requestIdleCallback) requestIdleCallback(callback);
      else setTimeout(callback, 500);
    }
  }

  const joinSocketRoom = (type, id) => {
    socket.emit('join', {type, id});
  }

  window.joinSocketRoom = joinSocketRoom;
  window.initSocket = initSocket;

  socket.on('connect', () => {
    console.log('Socket.io connected');
    initSocket();
  });

  socket.on('transaction-status', (data) => {
    console.log(data);
    if (data.transaction.status === 'PROCESSED') {
      dispatch({ type: types.CONFIRMED_PAYMENT, payload: data });
      dispatch(showSnackbar({ message: 'Payment confirmed' }))
    }
    else dispatch(showSnackbar({ message: 'Payment cancelled' }))
  })

  socket.on('order-status', (data) => {
    dispatch({ type: types.CONFIRMED_ORDER, payload: data });
    dispatch(showSnackbar({ message: 'Order confirmed' }))
  })

  socket.on('split', (data) => {
    dispatch({ type: types.SPLIT, payload: data });
    dispatch(showSnackbar({ message: 'Bill received split items' }))
  })

}

export default websockets;
