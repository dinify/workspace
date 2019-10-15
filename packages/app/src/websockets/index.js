
import io from 'socket.io-client';
import { snackbarActions as snackbar } from 'material-ui-snackbar-redux';
import { getType } from 'typesafe-actions';
import types from './types';
import { fetchBillAsync } from '../ducks/transaction/actions.ts';

// TODO: fix this shit
import { currentT as t } from '@dinify/common/src/lib/i18n/useTranslation';

const socket = io('https://ws.dinify.app');

const websockets = (store) => {
  const { dispatch, getState } = store;
  const state = getState();
  const getUID = () => state.firebase.auth.uid;

  const initSocket = () => {
    const auth = state.firebase.auth;
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
          message: t('paymentConfirmed')
        }));
      }
    }
    else if (me) {
      dispatch(snackbar.show({
        message: t('paymentCancelled')
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
          message: t('orderConfirmed')
        }));
      }
    }
    else if (payload.order.status === 'CANCELLED' && payload.order.initiator === getUID()) {
      dispatch(snackbar.show({
        message: t('orderCancelled')
      }));
    }
  });

  socket.on('call-status', (payload) => {
    if (payload.call.status === 'CONFIRMED') {
      dispatch({ type: types.CONFIRMED_CALL, payload });
      dispatch(snackbar.show({
        message: t('serviceCallConfirmed')
      }));
    }
    else if (payload.call.status === 'CANCELLED') {
      dispatch(snackbar.show({
        message: t('serviceCallCancelled')
      }));
    }
  });

  socket.on('checkin', (data) => {
    const me = data.seat.user_id === getUID();
    dispatch({ type: types.CHECKIN, payload: { ...data, me } });
    if (!me) {
      dispatch(snackbar.show({
        message: t('guestJoinedTable')
      }));
    }
  });

  socket.on('checkout', (payload) => {
    if (payload.seat.userId === getUID()) {
      dispatch({ type: types.CHECKOUT_ALL, payload });
      dispatch(snackbar.show({
        message: t('checkedOut')
      }));
    }
    else {
      dispatch({ type: types.CHECKOUT, payload });
      dispatch(snackbar.show({
        message: t('guestLeftTable')
      }));
    }
  });

  socket.on('checkout-all', (payload) => {
    dispatch({ type: types.CHECKOUT_ALL, payload });
    dispatch(snackbar.show({
      message: t('checkedOut')
    }));
  });

  socket.on('seats', (payload) => {
    dispatch({ type: types.SEATS, payload });
  });

  socket.on('split', (payload) => {
    dispatch({ type: types.SPLIT, payload });
    dispatch(snackbar.show({
      message: t('newBillSplitItems')
    }))
  });

}

export default websockets;
