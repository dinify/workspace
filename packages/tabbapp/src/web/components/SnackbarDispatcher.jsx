// @flow
import React from 'react';
import uniqueId from 'lodash.uniqueid';
import { connect } from 'react-redux';
import cartTypes from 'ducks/cart/types';
import restaurantTypes from 'ducks/restaurant/types';
import billTypes from 'ducks/bill/types';
import serviceTypes from 'ducks/service/types';
import uiTypes from 'ducks/ui/types';
import Snackbar from 'web/components/Snackbar';

const SnackbarDispatcher = ({
  historyPush,
  addToCartDone,
  checkInDone,
  orderDone,
  initiatedTransaction,
  serviceCallDone,
  paymentDone,
  orderConfirmDone
}) => {
  const snackbarsParams = [{
    message: "Added to cart",
    action: () => historyPush('/eat'),
    actionTitle: "Go to cart",
    initiated: addToCartDone
  },
  {
    message: "Order has been placed",
    initiated: orderDone
  },
  {
    message: "Payment request sent",
    initiated: initiatedTransaction
  },
  {
    message: "Order confirmed",
    initiated: orderConfirmDone
  },
  {
    message: "Payment confirmed",
    initiated: paymentDone
  },
  {
    message: "You are now checked in",
    action: () => historyPush('/'),
    actionTitle: "Go to restaurant menu",
    initiated: checkInDone
  },
  {
    message: "Service called",
    action: () => historyPush('/'),
    actionTitle: "Go to restaurant menu",
    initiated: serviceCallDone
  }];
  console.log(snackbarsParams);
  return (
    <div>
      {snackbarsParams.map((s) =>
        <Snackbar
          key={uniqueId()}
          message={s.message}
          action={s.action}
          actionTitle={s.actionTitle}
          open={s.initiated}
        />
      )}
    </div>
  )
}

export default connect(
  (state) => ({
    initiatedTransaction: state.ui.progressMap[billTypes.INIT_TRANSACTION_DONE],
    addToCartDone: state.ui.progressMap[cartTypes.ADD_TO_CART_DONE],
    orderDone: state.ui.progressMap[cartTypes.ORDER_DONE],
    checkInDone: state.ui.progressMap[restaurantTypes.CHECKIN_DONE],
    serviceCallDone: state.ui.progressMap[serviceTypes.CALL_SERVICE_DONE],
    paymentDone: state.ui.progressMap[uiTypes.CONFIRMED_PAYMENT_DONE],
    orderConfirmDone: state.ui.progressMap[uiTypes.CONFIRMED_ORDER_DONE]
  })
)(SnackbarDispatcher);
