// @flow
import { Observable } from 'rxjs';
import userTypes from 'ducks/user/types';
import types from './types';

const progressEpic = (action$: Observable) =>
  action$
    .filter(({ type }) => {
      if (type === types.ACTIVE_ACTION || type === types.UNACTIVE_ACTION) return false;
      if (type.includes('DONE')) return true;
      return false;
    })
    .mergeMap(({ type }) => {
      const unactive = Observable.of({
        type: types.UNACTIVE_ACTION,
        payload: type
      }).delay(6000);
      const active = Observable.of({
        type: types.ACTIVE_ACTION,
        payload: type
      })
      return Observable.merge(active, unactive);
    });

export default [
  progressEpic,
];
