
import io from 'socket.io-client';
import { snackbarActions as snackbar } from 'material-ui-snackbar-redux';
import { getType } from 'typesafe-actions';
import types from './types';
import { fetchBillAsync } from '../ducks/transaction/actions.ts';

const socket = io('https://ws.dinify.app');

const websockets = (store, i18nInstance) => {
  const { dispatch, getState } = store;
  const getUID = () => getState().firebase.auth.uid;

  const initSocket = () => {
    const auth = getState().firebase.auth;
    if (auth.uid) socket.emit('init', `user/${auth.uid}`);
  }
  window.initSocket = initSocket;

  socket.on('connect', () => {
    initSocket();
  });

  socket.on('transaction-status', (payload) => {
    const me = payload.transaction.initiator === getUID();
    if (payload.transaction.status === 'PROCESSED') {
      dispatch({
        type: getType(fetchBillAsync.request)
      });
      dispatch({
        type: types.CONFIRMED_PAYMENT,
        payload
      });
      if (me) {
        dispatch(snackbar.show({
          message: i18nInstance.t('paymentConfirmed')
        }));
      }
    }
    else if (me) {
      dispatch(snackbar.show({
        message: i18nInstance.t('paymentCancelled')
      }));
    }
  });

  socket.on('order-status', (payload) => {
    if (payload.order.status === 'CONFIRMED') {
      dispatch({
        type: getType(fetchBillAsync.request)
      });
      dispatch({
        type: types.CONFIRMED_ORDER, payload
      });
      if (payload.order.initiator === getUID()) {
        dispatch(snackbar.show({
          message: i18nInstance.t('orderConfirmed')
        }));
      }
    }
    else if (payload.order.status === 'CANCELLED' && payload.order.initiator === getUID()) {
      dispatch(snackbar.show({
        message: i18nInstance.t('orderCancelled')
      }));
    }
  });

  socket.on('call-status', (payload) => {
    if (payload.call.status === 'CONFIRMED') {
      dispatch({ type: types.CONFIRMED_CALL, payload });
      dispatch(snackbar.show({
        message: i18nInstance.t('serviceCallConfirmed')
      }));
    }
    else if (payload.call.status === 'CANCELLED') {
      dispatch(snackbar.show({
        message: i18nInstance.t('serviceCallCancelled')
      }));
    }
  });

  socket.on('checkin', (data) => {
    const me = data.seat.user_id === getUID();
    dispatch({ type: types.CHECKIN, payload: { ...data, me } });
    if (!me) {
      dispatch(snackbar.show({
        message: i18nInstance.t('guestJoinedTable')
      }));
    }
  });

  socket.on('checkout', (payload) => {
    if (payload.seat.userId === getUID()) {
      dispatch({ type: types.CHECKOUT_ALL, payload });
      dispatch(snackbar.show({
        message: i18nInstance.t('checkedOut')
      }));
    }
    else {
      dispatch({ type: types.CHECKOUT, payload });
      dispatch(snackbar.show({
        message: i18nInstance.t('guestLeftTable')
      }));
    }
  });

  socket.on('checkout-all', (payload) => {
    dispatch({ type: types.CHECKOUT_ALL, payload });
    dispatch(snackbar.show({
      message: i18nInstance.t('checkedOut')
    }));
  });

  socket.on('seats', (payload) => {
    dispatch({ type: types.SEATS, payload });
  });

  socket.on('split', (payload) => {
    dispatch({ type: types.SPLIT, payload });
    dispatch(snackbar.show({
      message: i18nInstance.t('newBillSplitItems')
    }))
  });

}

export default websockets;
