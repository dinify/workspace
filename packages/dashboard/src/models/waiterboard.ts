import { createModel } from '@rematch/core';
import assocPath from 'ramda/es/assocPath';
import assoc from 'ramda/es/assoc';
import * as API from '@dinify/common/src/api/v2/restaurant';

const initialState = {
  all: {},
  loaded: false
}

export type WaiterboardState = typeof initialState;

export default createModel({
  state: initialState,

  reducers: {
    setInAll: (state: WaiterboardState, payload: any): any =>
      assocPath(['all', payload.id], payload)(state),

    setLoaded: (state: WaiterboardState): any =>
      assoc('loaded', true)(state),
  },

  effects: {

    async fetchForSelectedRestaurant(payload, rootState) {
      const restaurantId = rootState.restaurant.selectedRestaurant;
      const res = await API.GetWaiterboardsOfRestaurant({ restaurantId });
      res.map((wb: any) => this.setInAll(wb));
      this.setLoaded(true);
    },

  },
});
