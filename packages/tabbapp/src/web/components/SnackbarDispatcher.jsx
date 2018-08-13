// @flow
import React from 'react';
import uniqueId from 'lodash.uniqueid';
import { connect } from 'react-redux';
import cartTypes from 'ducks/cart/types';
import restaurantTypes from 'ducks/restaurant/types';
import billTypes from 'ducks/bill/types';
import Snackbar from 'web/components/Snackbar';

const SnackbarDispatcher = ({
  historyPush,
  addToCartDone,
  checkInDone,
  orderDone,
  initiatedTransaction,
}) => {
  const snackbarsParams = [{
    message: "Added to cart",
    action: () => historyPush('/cart'),
    actionTitle: "Go to cart",
    initiated: addToCartDone
  },
  {
    message: "Order has been placed",
    action: () => historyPush('/bill'),
    actionTitle: "Go to bill",
    initiated: orderDone
  },
  {
    message: "Payment request sent",
    initiated: initiatedTransaction
  },
  {
    message: "You are now checked in",
    action: () => historyPush('/'),
    actionTitle: "Go to restaurant menu",
    initiated: checkInDone
  }];
  return (
    <div>
      {snackbarsParams.map((s) =>
        <Snackbar
          key={uniqueId()}
          message={s.message}
          action={s.action}
          actionTitle={s.actionTitle}
          initiated={s.initiated}
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
    checkInDone: state.ui.progressMap[restaurantTypes.CHECKIN_DONE]
  })
)(SnackbarDispatcher);
