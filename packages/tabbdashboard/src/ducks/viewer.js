// @flow

import { Observable } from 'rxjs';
import R from 'ramda';
import { getJoke } from '../selectors/viewer';
import { getRandomJoke } from '../api/search';
import type { EpicDependencies, Error, Action } from '../flow';

export const SEARCH = 'universalreact/viewer/SEARCH';
export const FETCH_INIT = 'universalreact/viewer/FETCH_INIT';
export const FETCH_SUCCESS = 'universalreact/viewer/FETCH_SUCCESS';
export const FETCH_ERROR = 'universalreact/viewer/FETCH_ERROR';

type State = {
  searchLoading: boolean,
  appRun: boolean,
  joke: ?string,
  lastError: ?Error,
};

const initialState = {
  searchLoading: false,
  appRun: false,
  joke: null,
  lastError: null,
};

// Reducer
export default function reducer(state: State = initialState, action: Action) {
  switch (action.type) {
    case FETCH_INIT:
      return R.evolve({
        searchLoading: R.T,
        lastError: R.always(null),
      })(state);
    case FETCH_SUCCESS: {
      const { joke } = action.payload;
      return R.evolve({
        searchLoading: R.F,
        joke: R.always(joke),
      })(state);
    }
    case FETCH_ERROR: {
      const { error } = action.payload;
      return R.evolve({
        searchLoading: R.F,
        lastError: R.always(error),
      })(state);
    }

    default:
      return state;
  }
}

// Action Creators
export function performSearch() {
  return { type: SEARCH };
}

export function fetchInitAction() {
  return { type: FETCH_INIT };
}

export function fetchSuccessAction(joke: string) {
  return { type: FETCH_SUCCESS, payload: { joke } };
}

export function fetchErrorAction(error: Error) {
  return { type: FETCH_ERROR, payload: { error } };
}

// Epics


const fetchEpic = (action$: Observable) =>
  action$
    .ofType(FETCH_INIT)
    .switchMap(() =>
      Observable.fromPromise(getRandomJoke())
        .map(fetchSuccessAction)
        .catch(error => Observable.of(fetchErrorAction(error))),
    );

export const epics = [fetchEpic];
