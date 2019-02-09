// @flow
import { Observable, of, from } from 'rxjs';
import { mergeMap, switchMap, map, catchError, filter } from 'rxjs/operators';
import { ofType } from 'redux-observable';
import R from 'ramda';
import { actionTypes } from 'react-redux-firebase';
import * as API from 'api/restaurant';

const pushTranslationEpic = (action$: Observable) =>
  action$.pipe(
    ofType('PUSH_TRANSLATION_INIT'),
    switchMap(({ payload }) => {
      const { changes, locale, type } = payload;
      const id = Object.keys(changes)[0];
      const name = changes[id];

      return from(API.AddTranslation({ type, id, locale, name })).pipe(
        map(() => ({
          type: 'PUSH_TRANSLATION_DONE',
          payload: { prePayload: payload }
        })),
        catchError(error => of({type: 'PUSH_TRANSLATION_FAIL', error}))
      );
    })
  );

export default [
  pushTranslationEpic
];
