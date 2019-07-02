import pipe from 'ramda/src/pipe';
import assoc from 'ramda/src/assoc';
import over from 'ramda/src/over';
import map from 'ramda/src/map';
import lensProp from 'ramda/src/lensProp';
import assocPath from 'ramda/src/assocPath';
import dissocPath from 'ramda/src/dissocPath';
import { ListToMap } from '@dinify/common/dist/lib/FN';
import * as types from './types';

const initialState = {
  all: {},
  backup: {},
  loaded: false,
};

export default function reducer(state = initialState, action) {
  const { type, payload } = action;

  switch (type) {

    case types.FETCH_RESTAURANTOPTIONS_DONE: {
      const addons = payload.res;
      return pipe(
        assoc('all', ListToMap(addons)),
        assoc('loaded', true)
      )(state);
    }

    case types.COLLAPSE_OPTION_INIT: {
      const { id } = payload;
      return over(
        lensProp('all'),
        map(o => assoc('collapsed', o.id === id ? !o.collapsed : false, o)),
      )(state);
    }

    case types.CREATE_OPTION_DONE: {
      const newOption = payload.res;
      return assocPath(['all', newOption.id], newOption)(state);
    }

    case types.REMOVE_OPTION_INIT: {
      const { id } = payload;
      const optionObj = state.all[id];
      return pipe(
        assocPath(['backup', id], optionObj),
        dissocPath(['all', id]),
      )(state);
    }

    case types.REMOVE_OPTION_FAIL: {
      const { id } = payload.initPayload;
      return assocPath(['all', id], state.backup[id])(state);
    }

    case types.CREATE_CHOICE_DONE: {
      const { optionId } = payload.initPayload;
      const newChoice = payload.res;
      return assocPath(['all', optionId, 'choices', newChoice.id], newChoice)(state);
    }

    case types.REMOVE_CHOICE_INIT: {
      const { id, optionId } = payload;
      const choiceObj = state.all[optionId].choices[id];
      return pipe(
        assocPath(['backup', id], choiceObj),
        dissocPath(['all', optionId, 'choices', id]),
      )(state);
    }

    case types.REMOVE_CHOICE_FAIL: {
      const { id, optionId } = payload.initPayload;
      return assocPath(['all', optionId, 'choices', id], state.backup[id])(state);
    }

    default:
      return state;
  }
}
