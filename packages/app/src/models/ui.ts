import { createModel } from '@rematch/core';
import assocPath from 'ramda/es/assocPath';
import assoc from 'ramda/es/assoc';

const initialState = {
  all: {},
  loaded: false,
}

export type UIState = typeof initialState;

export default createModel({
  state: initialState,
  reducers: {
    setInAll: (state: UIState, payload: any): any =>
      assocPath(['all', payload.id], payload)(state),

    setLoaded: (state: UIState): any =>
      assoc('loaded', true)(state),

  },
});
