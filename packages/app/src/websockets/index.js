
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

  socket.on('transaction-status', (data) => {
    const me = data.transaction.initiator === getUID();
    if (data.transaction.status === 'PROCESSED') {
      dispatch({
        type: getType(fetchBillAsync.request)
      });
      dispatch({
        type: types.CONFIRMED_PAYMENT,
        payload: data
      });
      if (me) {
        dispatch(snackbar.show({ message: i18nInstance.t('paymentConfirmed') }));
      }
    }
    else if (me) {
      dispatch(snackbar.show({ message: i18nInstance.t('paymentCancelled') }));
    }
  });

  socket.on('order-status', (data) => {
    if (data.order.status === 'CONFIRMED') {
      dispatch({
        type: getType(fetchBillAsync.request)
      });
      dispatch({
        type: types.CONFIRMED_ORDER, payload: data
      });
      if (data.order.initiator === getUID()) {
        dispatch(snackbar.show({ message: i18nInstance.t('orderConfirmed') }));
      }
    }
    else if (data.order.status === 'CANCELLED' && data.order.initiator === getUID()) {
      dispatch(snackbar.show({ message: i18nInstance.t('orderCancelled') }));
    }
  });

  socket.on('call-status', (data) => {
    if (data.call.status === 'CONFIRMED') {
      dispatch({ type: types.CONFIRMED_CALL, payload: data });
      dispatch(snackbar.show({ message: i18nInstance.t('serviceCallConfirmed') }));
    }
    else if (data.call.status === 'CANCELLED') {
      dispatch(snackbar.show({ message: i18nInstance.t('serviceCallCancelled') }));
    }
  });

  socket.on('checkin', (data) => {
    const me = data.seat.user_id === getUID();
    dispatch({ type: types.CHECKIN, payload: { ...data, me } });
    if (!me) {
      dispatch(snackbar.show({ message: i18nInstance.t('guestJoinedTable') }));
    }
  });

  socket.on('checkout', (data) => {
    if (data.seat.userId === getUID()) {
      dispatch({ type: types.CHECKOUT_ALL, payload: data });
      dispatch(snackbar.show({ message: i18nInstance.t('checkedOut') }));
    }
    else {
      dispatch({ type: types.CHECKOUT, payload: data });
      dispatch(snackbar.show({ message: i18nInstance.t('guestLeftTable') }));
    }
  });

  socket.on('checkout-all', (data) => {
    dispatch({ type: types.CHECKOUT_ALL, payload: data });
    dispatch(snackbar.show({ message: i18nInstance.t('checkedOut')}));
  });

  socket.on('seats', (data) => {
    dispatch({ type: types.SEATS, payload: data });
  });

  socket.on('split', (data) => {
    dispatch({ type: types.SPLIT, payload: data });
    dispatch(snackbar.show({ message: i18nInstance.t('newBillSplitItems') }))
  });

}

export default websockets;
