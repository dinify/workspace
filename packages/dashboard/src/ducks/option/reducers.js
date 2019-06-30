import pipe from 'ramda/src/pipe';
import assoc from 'ramda/src/assoc';
import over from 'ramda/src/over';
import map from 'ramda/src/map';
import lensProp from 'ramda/src/lensProp';
import assocPath from 'ramda/src/assocPath';
import dissocPath from 'ramda/src/dissocPath';
import { UpdateOriginal } from '@dinify/common/dist/lib/FN';
import * as restaurantTypes from 'ducks/restaurant/types';

const initialState = {
  all: {},
  backup: {},
};

export default function reducer(state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case restaurantTypes.FETCH_LOGGEDRESTAURANT_DONE: {
      const actualOptions = payload.res.options;
      return assoc('all', UpdateOriginal(state.all, actualOptions))(state);
    }

    case 'COLLAPSE_OPTION_INIT': {
      const { id } = payload;
      return over(
        lensProp('all'),
        map(o => assoc('collapsed', o.id === id ? !o.collapsed : false, o)),
      )(state);
    }

    case 'CREATE_OPTION_DONE': {
      const newOption = payload.res;
      return assocPath(['all', newOption.id], newOption)(state);
    }

    case 'REMOVE_OPTION_INIT': {
      const { id } = payload;
      const optionObj = state.all[id];
      return pipe(
        assocPath(['backup', id], optionObj),
        dissocPath(['all', id]),
      )(state);
    }

    case 'REMOVE_OPTION_FAIL': {
      const { id } = payload.initPayload;
      return assocPath(['all', id], state.backup[id])(state);
    }

    case 'CREATE_CHOICE_DONE': {
      const { optionId } = payload.initPayload;
      const newChoice = payload.res;
      return assocPath(['all', optionId, 'choices', newChoice.id], newChoice)(state);
    }

    case 'REMOVE_CHOICE_INIT': {
      const { id, optionId } = payload;
      const choiceObj = state.all[optionId].choices[id];
      return pipe(
        assocPath(['backup', id], choiceObj),
        dissocPath(['all', optionId, 'choices', id]),
      )(state);
    }

    case 'REMOVE_CHOICE_FAIL': {
      const { id, optionId } = payload.initPayload;
      return assocPath(['all', optionId, 'choices', id], state.backup[id])(state);
    }

    default:
      return state;
  }
}
