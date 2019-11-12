import * as types from './types';

export const toggleFrames = (i: any) => {
  return {
    type: types.TOGGLE_FRAMES,
    payload: { i }
  };
}

export const toggleModal = (payload: any) => {
  return {
    type: types.TOGGLE_MODAL,
    payload // { open, userId }
  };
}
