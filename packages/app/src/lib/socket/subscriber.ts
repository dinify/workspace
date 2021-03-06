import { makeSubscriber } from '@dinify/common/src/lib/socket';
import { useDispatch } from 'react-redux';
import { getType } from 'typesafe-actions';
import * as actions from 'features/socket/actions';
import { fetchBillAsync } from 'features/transaction/actions';
import { actions as uiActions } from 'models/ui';
import { TFunction } from '@dinify/common/src/lib/i18n/translations';
import { Call, Seat } from 'ServiceModels';
import { Transaction, Order } from 'TransactionModels';

// get linting for event types
export type EventType =
  | 'transaction-status'
  | 'order-status'
  | 'call-status'
  | 'checkin'
  | 'checkout'
  | 'checkout-all'
  | 'seats'
  | 'split';

export const useSubscription = makeSubscriber<EventType>();

export const useSubscriber = (uid: string) => {
  // alternatively, pass the dispatch function as an argument to this useSubscriber hook
  const dispatch = useDispatch();

  useSubscription<{ transaction: Transaction }>(
    'transaction-status',
    payload => {
      const me = payload.transaction.initiator === uid;
      if (payload.transaction.status === 'PROCESSED') {
        dispatch({
          type: getType(fetchBillAsync.request),
        });
        dispatch(actions.confirmedPaymentAction(payload));
        if (me) {
          dispatch(
            uiActions.showSnackbar({
              message: (t: TFunction) => t('paymentConfirmed'),
            }),
          );
        }
      } else if (me) {
        dispatch(
          uiActions.showSnackbar({
            message: (t: TFunction) => t('paymentCancelled'),
          }),
        );
      }
    },
  );

  useSubscription<{ order: Order }>('order-status', payload => {
    if (payload.order.status === 'CONFIRMED') {
      dispatch({
        type: getType(fetchBillAsync.request),
      });
      dispatch(actions.confirmedOrderAction(payload));
      if (payload.order.initiator === uid) {
        dispatch(
          uiActions.showSnackbar({
            message: (t: TFunction) => t('order.confirmed'),
          }),
        );
      }
    } else if (
      payload.order.status === 'CANCELLED' &&
      payload.order.initiator === uid
    ) {
      dispatch(
        uiActions.showSnackbar({
          message: (t: TFunction) => t('order.cancelled'),
        }),
      );
    }
  });

  useSubscription<{ call: Call }>('call-status', payload => {
    if (payload.call.status === 'CONFIRMED') {
      dispatch(actions.confirmedCallAction(payload));
      dispatch(
        uiActions.showSnackbar({
          message: (t: TFunction) => t('serviceCallConfirmed'),
        }),
      );
    } else if (payload.call.status === 'CANCELLED') {
      dispatch(
        uiActions.showSnackbar({
          message: (t: TFunction) => t('serviceCallCancelled'),
        }),
      );
    }
  });
  useSubscription<{ seat: Seat; table_id: string }>('checkin', payload => {
    const me = payload.seat.userId === uid;
    dispatch(actions.checkinAction({ ...payload, me }));
    if (!me) {
      dispatch(
        uiActions.showSnackbar({
          message: (t: TFunction) => t('guestJoinedTable'),
        }),
      );
    }
  });
  useSubscription<{ seat: Seat; table_id: string }>('checkout', payload => {
    if (payload.seat.userId === uid) {
      dispatch(actions.checkoutAllAction(payload));
      dispatch(
        uiActions.showSnackbar({
          message: (t: TFunction) => t('checkedOut'),
        }),
      );
    } else {
      dispatch(actions.checkoutAction(payload));
      dispatch(
        uiActions.showSnackbar({
          message: (t: TFunction) => t('guestLeftTable'),
        }),
      );
    }
  });
  useSubscription('checkout-all', payload => {
    dispatch(actions.checkoutAllAction(payload));
    dispatch(
      uiActions.showSnackbar({
        message: (t: TFunction) => t('checkedOut'),
      }),
    );
  });
  useSubscription('seats', payload => {
    dispatch(actions.seatsAction(payload));
  });
  useSubscription('split', payload => {
    dispatch(actions.splitAction(payload));
    dispatch(
      uiActions.showSnackbar({
        message: (t: TFunction) => t('newBillSplitItems'),
      }),
    );
  });
};
