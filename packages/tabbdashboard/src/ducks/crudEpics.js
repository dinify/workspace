// @flow
import { Observable, of, from } from 'rxjs';
import { mergeMap, map, catchError, filter } from 'rxjs/operators';
import * as API from 'api/restaurant';
import R from 'ramda';

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

const createEpic = (action$: Observable) =>
  action$.pipe(
    filter(action => filterAction(action.type, 'CREATE', 'INIT')),
    mergeMap(({ payload, type }) => {
      const { subject, path } = getSubjectAndPath(type, 'CREATE', 'INIT');
      const apiFnName = `Create${camel(subject)}`;
      return from(API[apiFnName](payload)).pipe(
        map(res => ({
          type: `${path}CREATE_${subject}_DONE`,
          payload: { res, prePayload: payload },
        })),
        catchError(error => of({
          type: `${path}CREATE_${subject}_FAIL`,
          payload: error,
          error: true
        }))
      )
    })
  );


const fetchEpic = (action$: Observable) =>
  action$.pipe(
    filter(action => filterAction(action.type, 'FETCH', 'INIT')),
    mergeMap(({ payload, type }) => {
      const { subject, path } = getSubjectAndPath(type, 'FETCH', 'INIT');
      const apiFnName = `Get${camel(subject)}`;
      return from(API[apiFnName](payload)).pipe(
        map(res => ({
          type: `${path}FETCH_${subject}_DONE`,
          payload: { res, prePayload: payload },
        })),
        catchError(error => of({
          type: `${path}FETCH_${subject}_FAIL`,
          payload: error,
          error: true
        }))
      )
    })
  );


const fetchAllEpic = (action$, state$) =>
  action$.pipe(
    filter(action => filterAction(action.type, 'FETCHALL', 'INIT')),
    mergeMap(({ payload, type }) => {
      const { subject, path } = getSubjectAndPath(type, 'FETCHALL', 'INIT');
      let ids = payload.ids;
      if (payload.cache) {
        const storeKey = subject.toLowerCase();
        const all = state$.value[storeKey].all;
        ids = R.filter((id) => !all[id], ids);
      }
      return of(ids.map((id) => ({
        type: `${path}FETCH_${subject}_INIT`,
        payload: {
          id
        }
      })).concat({
        type: `${path}FETCHALL_${subject}_DONE`
      }))
    })
  );

const updateEpic = (action$: Observable) =>
  action$.pipe(
    filter(action => filterAction(action.type, 'UPDATE', 'INIT')),
    mergeMap(({ payload, type }) => {
      const { subject, path } = getSubjectAndPath(type, 'UPDATE', 'INIT');
      const apiFnName = `Change${camel(subject)}`;
      return from(API[apiFnName](payload)).pipe(
        map(res => ({
          type: `${path}UPDATE_${subject}_DONE`,
          payload: { res, prePayload: payload },
        })),
        catchError(error => of({
          type: `${path}UPDATE_${subject}_FAIL`,
          payload: error,
          error: true
        }))
      )
    })
  );

const removeEpic = (action$: Observable) =>
  action$.pipe(
    filter(action => filterAction(action.type, 'REMOVE', 'INIT')),
    mergeMap(({ payload, type }) => {
      const { subject, path } = getSubjectAndPath(type, 'REMOVE', 'INIT');
      const apiFnName = `Remove${camel(subject)}`;
      return from(API[apiFnName](payload)).pipe(
        map(res => ({
          type: `${path}REMOVE_${subject}_DONE`,
          payload: { res, prePayload: payload },
        })),
        catchError(error => of({
          type: `${path}REMOVE_${subject}_FAIL`,
          payload: error,
          error: true
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
