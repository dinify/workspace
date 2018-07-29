// @flow
import { Observable } from 'rxjs';
import * as API from 'api/restaurant';
import { reset } from 'redux-form';

const capitalize = str => str.charAt(0).toUpperCase() + str.slice(1);
const camel = str => capitalize(str.toLowerCase());

const createEpic = (action$: Observable, { getState }: EpicDependencies) =>
  action$
    .filter(
      action =>
        action.type.startsWith('CREATE_') && action.type.endsWith('_INIT'),
    )
    .exhaustMap(({ payload, type }) => {
      const subject = type.replace('CREATE_', '').replace('_INIT', '');
      const apiFnName = `Create${camel(subject)}`;
      return Observable.fromPromise(
        API[apiFnName]({
          restaurantId: getState().restaurant.loggedRestaurant.id,
          ...payload,
        }),
      )
        .mergeMap(res => {
          const actions = [{
            type: `CREATE_${subject}_DONE`,
            payload: { res, prePayload: payload },
          }];
          if (payload.form) actions.push(reset(payload.form));
          return actions;
        })
        .catch(error =>
          Observable.of({ type: `CREATE_${subject}_FAIL`, payload: error }),
        );
    });

const fetchEpic = (action$: Observable, { getState }: EpicDependencies) =>
  action$
    .filter(
      action =>
        action.type.startsWith('FETCH_') && action.type.endsWith('_INIT'),
    )
    .switchMap(({ payload, type }) => {
      const subject = type.replace('FETCH_', '').replace('_INIT', '');
      const apiFnName = `Get${camel(subject)}`;
      return Observable.fromPromise(
        API[apiFnName]({
          restaurantId: getState().restaurant.loggedRestaurant.id,
          ...payload,
        }),
      )
        .map(res => ({
          type: `FETCH_${subject}_DONE`,
          payload: { res, prePayload: payload },
        }))
        .catch(error =>
          Observable.of({ type: `FETCH_${subject}_FAIL`, payload: error }),
        );
    });

const updateEpic = (action$: Observable, { getState }: EpicDependencies) =>
  action$
    .filter(
      action =>
        action.type.startsWith('UPDATE_') && action.type.endsWith('_INIT'),
    )
    .switchMap(({ payload, type }) => {
      const subject = type.replace('UPDATE_', '').replace('_INIT', '');
      const apiFnName = `Change${camel(subject)}`;
      return Observable.fromPromise(
        API[apiFnName]({
          restaurantId: getState().restaurant.loggedRestaurant.id,
          ...payload,
        }),
      )
        .map(res => ({
          type: `UPDATE_${subject}_DONE`,
          payload: { res, prePayload: payload },
        }))
        .catch(error =>
          Observable.of({ type: `UPDATE_${subject}_FAIL`, payload: error }),
        );
    });

const removeEpic = (action$: Observable, { getState }: EpicDependencies) =>
  action$
    .filter(
      action =>
        action.type.startsWith('REMOVE_') && action.type.endsWith('_INIT'),
    )
    .switchMap(({ payload, type }) => {
      const subject = type.replace('REMOVE_', '').replace('_INIT', '');
      const apiFnName = `Delete${camel(subject)}`;
      return Observable.fromPromise(
        API[apiFnName]({
          restaurantId: getState().restaurant.loggedRestaurant.id,
          ...payload,
        }),
      )
        .map(() => ({ type: `REMOVE_${subject}_DONE`, payload }))
        .catch(error =>
          Observable.of({
            type: `REMOVE_${subject}_FAIL`,
            payload: {
              prePayload: payload,
              error,
            },
          }),
        );
    });

export const epics = [createEpic, fetchEpic, updateEpic, removeEpic];
