// @flow
import R from 'ramda'
import type { Action } from '../flow'
//import io from 'socket.io-client'
//const socket = io('http://tabb-apiv2.eu-central-1.elasticbeanstalk.com')
//socket.on('connect', () => {
//  console.log('SocketIO connected')
//  socket.emit('init', 231)
//})
//
//socket.on('service_call_confirmed', (data) => console.log('s'))
//socket.on('order_confirmed', (data) => console.log('o'))
//socket.on('order_ahead_confirmed', (data) => console.log('oh'))
//socket.on('bill_confirmed', (data) => console.log('bill'))
//socket.on('booking_confirmed', (data) => console.log('booking'))


type State = {
  all: Object
};

const initialState = {
  frameIndex: 1,
  modalOpen: false,
  modalType: null,
  modalPayload: {},
  waiterboardName: null,
  billsOfTable: []
};

// Reducer
export default function reducer(state: State = initialState, action: Action) {
  switch (action.type) {

    //case 'LOGGED_FETCHED_DONE': {
    //  return R.assoc('waiterboardName', action.payload.login_id)(state);
    //}

    case 'TOGGLE_FRAMES': {
      return R.assoc('frameIndex', action.payload.i)(state);
    }
    case 'GET_BILLSOFTABLE_DONE':
      return R.assoc('billsOfTable', action.payload)(state);
    case 'TOGGLE_MODAL': {
      const { open, type } = action.payload;
      if(!open) state = R.assoc('billsOfTable', [])(state)
      return R.evolve({
        modalOpen: R.always(open),
        modalType: open ? R.always(type) : R.always(''),
        modalPayload: open ? R.always(action.payload) : R.always({}),
      })(state);
    }

    default:
      return state;
  }
}


// Action Creators

export const toggleFrames = (i) => {
  return {
    type: 'TOGGLE_FRAMES',
    payload: { i }
  };
}

export const toggleModal = (payload) => {
  return {
    type: 'TOGGLE_MODAL',
    payload // { open, userId }
  };
}
