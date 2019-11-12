import * as types from './types';

export const toggleFrames = (i) => {
  return {
    type: types.TOGGLE_FRAMES,
    payload: { i }
  };
}

export const toggleModal = (payload) => {
  return {
    type: types.TOGGLE_MODAL,
    payload // { open, userId }
  };
}
