import pipe from 'ramda/es/pipe';
import assoc from 'ramda/es/assoc';
import over from 'ramda/es/over';
import map from 'ramda/es/map';
import lensProp from 'ramda/es/lensProp';
import assocPath from 'ramda/es/assocPath';
import dissocPath from 'ramda/es/dissocPath';
import { ListToMap } from '@dinify/common/src/lib/FN';
import { actionTypes as firebaseTypes } from 'react-redux-firebase';
import * as types from './types';
import { getType } from 'typesafe-actions';
import { fetchOptionsAsync, createOptionAsync, createChoiceAsync } from './actions';
import { fetchMenuItemAsync } from '../menuItem/actions';

const initialState = {
  all: {},
  backup: {},
  choices: {},
  loaded: false,
};

export default function reducer(state = initialState, action) {
  const { type, payload } = action;

  switch (type) {

    case getType(fetchOptionsAsync.success): {
      const { options, choices } = payload.entities;
      return pipe(
        assoc('all', { ...state.all, ...options }),
        assoc('choices', { ...state.choices, ...choices }),
        assoc('loaded', true)
      )(state);
    }

    case getType(createOptionAsync.success): {
      const newOption = { ...payload, choices: [] };
      return assocPath(['all', newOption.id], newOption)(state);
    }

    case getType(createChoiceAsync.success): {
      const price = action.meta.difference;
      const newChoice = { ...payload, price };
      const oldChoicesIds = state.all[newChoice.optionId].choices;
      return pipe(
        assocPath(['all', newChoice.optionId, 'choices'], [...oldChoicesIds, newChoice.id]),
        assocPath(['choices', newChoice.id], newChoice)
      )(state);
    }

    case getType(fetchMenuItemAsync.success): {
      const { options, choices } = payload.entities;
      return pipe(
        assoc('all', { ...state.all, ...options }),
        assoc('choices', { ...state.choices, ...choices }),
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
      const oldChoicesIds = state.all[optionId].choices;
      const newChoicesIds = oldChoicesIds.filter(ch => ch !== id);
      return pipe(
        assocPath(['all', optionId, 'choices'], newChoicesIds),
        dissocPath(['choices', id]),
      )(state);
    }

    case firebaseTypes.LOGOUT: {
      return initialState;
    }
    
    default:
      return state;
  }
}
