import { showSnackbarAction } from '../../ducks/ui/actions';
import { getType, RootState } from 'typesafe-actions';
import * as actions from '../../ducks/socket/actions';
import { fetchBillAsync } from '../../ducks/transaction/actions';
import { useEffect } from 'react';
import { useSocket } from '.';
import { useDispatch, useSelector } from 'react-redux';
import toPairs from 'ramda/es/toPairs';
import { Order } from 'TransactionModels';

export const useListeners = () => {
  const dispatch = useDispatch();
  const uid = useSelector<RootState, string>(state => state.firebase.auth.uid);
  const socket = useSocket();

  const listeners = {
    'transaction-status': (payload: any) => {
      const me = payload.transaction.initiator === uid;
      if (payload.transaction.status === 'PROCESSED') {
        dispatch({
          type: getType(fetchBillAsync.request)
        });
        dispatch(actions.confirmedPaymentAction(payload));
        if (me) {
          dispatch(showSnackbarAction({
            message: t => t('paymentConfirmed')
          }));
        }
      }
      else if (me) {
        dispatch(showSnackbarAction({
          message: t => t('paymentCancelled')
        }));
      }
    },
    'order-status': (payload: { order: Order }) => {
      if (payload.order.status === 'CONFIRMED') {
        dispatch({
          type: getType(fetchBillAsync.request)
        });
        dispatch(actions.confirmedOrderAction(payload));
        if (payload.order.initiator === uid) {
          dispatch(showSnackbarAction({
            message: t => t('orderConfirmed')
          }));
        }
      }
      else if (payload.order.status === 'CANCELLED' && payload.order.initiator === uid) {
        dispatch(showSnackbarAction({
          message: t => t('orderCancelled')
        }));
      }
    },
    'call-status': (payload: any) => {
      if (payload.call.status === 'CONFIRMED') {
        dispatch(actions.confirmedCallAction(payload));
        dispatch(showSnackbarAction({
          message: t => t('serviceCallConfirmed')
        }));
      }
      else if (payload.call.status === 'CANCELLED') {
        dispatch(showSnackbarAction({
          message: t => t('serviceCallCancelled')
        }));
      }
    },
    'checkin': (data: any) => {
      const me = data.seat.user_id === uid;
      dispatch(actions.checkinAction({ ...data, me }));
      if (!me) {
        dispatch(showSnackbarAction({
          message: t => t('guestJoinedTable')
        }));
      }
    },
    'checkout': (payload: any) => {
      if (payload.seat.userId === uid) {
        dispatch(actions.checkoutAllAction(payload));
        dispatch(showSnackbarAction({
          message: t => t('checkedOut')
        }));
      }
      else {
        dispatch(actions.checkoutAction(payload));
        dispatch(showSnackbarAction({
          message: t => t('guestLeftTable')
        }));
      }
    },
    'checkout-all': (payload: any) => {
      dispatch(actions.checkoutAllAction(payload));
      dispatch(showSnackbarAction({
        message: t => t('checkedOut')
      }));
    },
    'seats': (payload: any) => {
      dispatch(actions.seatsAction(payload));
    },
    'split': (payload: any) => {
      dispatch(actions.splitAction(payload));
      dispatch(showSnackbarAction({
        message: t => t('newBillSplitItems')
      }))
    },
  };

  useEffect(() => {
    if (uid && socket !== null && socket.connected) {
      socket.emit('init', `user/${uid}`);
      toPairs(listeners).map(([event, listener]) => {
        socket.on(event, listener);
      });
    
      return function cleanup() {
        toPairs(listeners).map(([event, listener]) => {
          socket.removeListener(event, listener);
        });
      };
    }
    return () => {};
  });
}
