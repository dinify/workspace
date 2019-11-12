import types from './types';

export const fetchSeatsInit = () => ({
  type: types.FETCH_SEATS_INIT,
})

export const fetchSeatsFail = (e) => ({
  type: types.FETCH_SEATS_FAIL,
  payload: e
})

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
