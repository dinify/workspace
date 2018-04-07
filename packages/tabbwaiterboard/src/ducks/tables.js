// @flow
import { Observable } from 'rxjs';
import R from 'ramda';

import * as API from '../api/restaurant';

import type { Action } from '../flow';

type State = {
  all: Object
};

const initialState = {
  all: {}
};

// Reducer
export default function reducer(state: State = initialState, action: Action) {
  switch (action.type) {

    case 'LOGGED_FETCHED_DONE': {
      const restaurant = action.payload
      const waiterboards = restaurant.waiterboards
      const selectedWBid = R.keys(waiterboards)[0]
      const wb = waiterboards[selectedWBid]
      return R.assoc('all', wb.tables)(state);
    }

    default:
      return state;
  }
}

// Action Creators

export const clearTable = (payload) => {
  return {
    type: 'CLEAR_TABLE_INIT',
    payload
  };
}

export const clearUser = (payload) => {
  return {
    type: 'CLEAR_USER_INIT',
    payload
  };
}


const clearTableEpic = (action$: Observable, { getState, dispatch }) =>
  action$
    .filter(action => action.type === 'CLEAR_TABLE_INIT')
    .switchMap(({ payload }) => {
      if(!global.confirm('Do you really want to check-out this table?')) return Observable.of({type: "CLEAR_TABLE_CANCELED"});
      return Observable.fromPromise(API.CheckOut({tableId: payload.table.id }))
        .map(() => ({type: 'CLEAR_TABLE_DONE', payload }))
        .catch(error => Observable.of(({type: 'CLEAR_TABLE_FAIL'})))
    });

const clearUserEpic = (action$: Observable, { getState, dispatch }) =>
  action$
    .filter(action => action.type === 'CLEAR_USER_INIT')
    .switchMap(({ payload }) => {
      if(!global.confirm('Do you really want to check-out this user?')) return Observable.of({type: "CLEAR_USER_CANCELED"});
      return Observable.fromPromise(API.CheckOutUser({userId: payload.userId }))
        .map(() => ({type: 'CLEAR_USER_DONE', payload }))
        .catch(error => Observable.of(({type: 'CLEAR_USER_FAIL'})))
    });

export const epics = [
  clearTableEpic,
  clearUserEpic
];
