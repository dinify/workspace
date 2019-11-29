import types from './types';

export const selectBillItem = ({ selected, path }) => ({
  type: types.SELECT_BILLITEM,
  payload: { selected, path  }
})

export const selectSeat = ({ selected, seatIndex }) => ({
  type: types.SELECT_SEAT,
  payload: { selected, seatIndex  }
})

export const clearSelectedBillItems = () => ({
  type: types.CLEAR_SELECTED_BILLITEMS,
})
