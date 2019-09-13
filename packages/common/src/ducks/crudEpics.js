import { Observable, of, from } from 'rxjs';
import { mergeMap, switchMap, map, catchError, filter } from 'rxjs/operators';
import API from '../api';
import ramdaFilter from 'ramda/src/filter';
import { handleEpicAPIError } from '../lib/FN';

const capitalize = str => str.charAt(0).toUpperCase() + str.slice(1);
const camel = str => capitalize(str.toLowerCase());
const withoutPath = type => type.match(/\w+(?:\.\w+)*$/g)[0];
const getSubjectAndPath = (type, kind, stage) => {
  const typeWithoutPath = withoutPath(type);
  return {
    subject: typeWithoutPath.replace(`${kind}_`, '').replace(`_${stage}`, ''),
    path: type.replace(typeWithoutPath, ''),
  };
};
const filterAction = (type, kind, stage) => {
  const typeOnly = withoutPath(type);
  return typeOnly.startsWith(`${kind}_`) && typeOnly.endsWith(`_${stage}`);
};

const getRestaurantId = (state) => {
  if (state.restaurant && state.restaurant.selectedRestaurant) {
    return state.restaurant.selectedRestaurant;
  }
  if (state.app && state.app.selectedRestaurant) {
    return state.app.selectedRestaurant;
  }
  return undefined;
}

const createEpic = (action$, state$) =>
  action$.pipe(
    filter(action => filterAction(action.type, 'CREATE', 'INIT')),
    mergeMap((action) => {
      const { payload = {}, type } = action;
      const { subject, path } = getSubjectAndPath(type, 'CREATE', 'INIT');
      const apiFnName = `Create${camel(subject)}`;
      
      const state = state$.value;
      payload.restaurantId = getRestaurantId(state);

      return from(API[apiFnName](payload)).pipe(
        map(res => ({
          type: `${path}CREATE_${subject}_DONE`,
          payload: { res, initPayload: payload },
        })),
        catchError(error => handleEpicAPIError({
          error,
          failActionType: `${path}CREATE_${subject}_FAIL`,
          initAction: action
        }))
      )
    })
  );

const fetchEpic = (action$, state$) =>
  action$.pipe(
    filter(action => filterAction(action.type, 'FETCH', 'INIT')),
    mergeMap((action) => {
      const { payload = {}, type } = action;
      const { subject, path } = getSubjectAndPath(type, 'FETCH', 'INIT');
      const apiFnName = `Get${camel(subject)}`;

      const state = state$.value;
      payload.restaurantId = getRestaurantId(state);

      return from(API[apiFnName](payload)).pipe(
        map(res => ({
          type: `${path}FETCH_${subject}_DONE`,
          payload: { res, initPayload: payload },
        })),
        catchError(error => handleEpicAPIError({
          error,
          failActionType: `${path}FETCH_${subject}_FAIL`,
          initAction: action
        }))
      )
    })
  );

const fetchAllEpic = (action$, state$) =>
  action$.pipe(
    filter(action => filterAction(action.type, 'FETCHALL', 'INIT')),
    switchMap(({ payload, type }) => {
      const { subject, path } = getSubjectAndPath(type, 'FETCHALL', 'INIT');
      let ids = payload.ids;
      if (payload.cache) {
        const storeKey = subject.toLowerCase();
        const all = state$.value[storeKey].all;
        ids = ramdaFilter((id) => !all[id], ids);
      }
      return ids.map((id) => ({
        type: `${path}FETCH_${subject}_INIT`,
        payload: {
          id
        }
      })).concat({
        type: `${path}FETCHALL_${subject}_DONE`
      })
    })
  );

const updateEpic = (action$, state$) =>
  action$.pipe(
    filter(action => filterAction(action.type, 'UPDATE', 'INIT')),
    mergeMap((action) => {
      const { payload = {}, type } = action;
      const { subject, path } = getSubjectAndPath(type, 'UPDATE', 'INIT');
      const apiFnName = `Change${camel(subject)}`;

      const state = state$.value;
      payload.restaurantId = getRestaurantId(state);

      return from(API[apiFnName](payload)).pipe(
        map(res => ({
          type: `${path}UPDATE_${subject}_DONE`,
          payload: { res, initPayload: payload },
        })),
        catchError(error => handleEpicAPIError({
          error,
          failActionType: `${path}UPDATE_${subject}_FAIL`,
          initAction: action
        }))
      )
    })
  );

const removeEpic = (action$, state$) =>
  action$.pipe(
    filter(action => filterAction(action.type, 'REMOVE', 'INIT')),
    mergeMap((action) => {
      const { payload = {}, type } = action;
      const { subject, path } = getSubjectAndPath(type, 'REMOVE', 'INIT');
      const apiFnName = `Remove${camel(subject)}`;

      const state = state$.value;
      payload.restaurantId = getRestaurantId(state);

      return from(API[apiFnName](payload)).pipe(
        map(res => ({
          type: `${path}REMOVE_${subject}_DONE`,
          payload: { res, initPayload: payload },
        })),
        catchError(error => handleEpicAPIError({
          error,
          failActionType: `${path}REMOVE_${subject}_FAIL`,
          initAction: action
        }))
      )
    })
  );

export const epics = [
  createEpic,
  fetchEpic,
  fetchAllEpic,
  updateEpic,
  removeEpic
];
