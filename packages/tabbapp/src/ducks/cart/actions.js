import types from './types';

export const addItem = (payload) => ({
  type: types.ADD_ITEM,
  payload
});
