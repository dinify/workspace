import * as types from './types';

export const selectWaiterboard = ({ id, restaurantId }) => ({
  type: types.SELECT_WAITERBOARD,
  payload: { id, restaurantId }
});

export const appBootstrap = () => ({
  type: types.BOOTSTRAP
});

export const loadStateInit = () => ({
  type: types.LOAD_STATE_INIT
});
