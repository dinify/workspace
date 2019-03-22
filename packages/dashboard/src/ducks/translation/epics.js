// @flow
import { Observable, of, from as fromPromise } from 'rxjs';
import { mergeMap, switchMap, map, catchError, filter } from 'rxjs/operators';
import { ofType } from 'redux-observable';
import * as R from 'ramda';
import { actionTypes } from 'react-redux-firebase';
import * as API from 'api/restaurant';
import { Post } from '@dinify/common/dist/api/Network';
import { change as changeForm } from 'redux-form';
import { MapToList, ListToMap } from 'lib/FN';

const saveTranslationDone = () => {
  return { type: 'PUSH_TRANSLATION_DONE'}
}

const pushTranslationEpic = (action$: Observable) =>
  action$.pipe(
    ofType('PUSH_TRANSLATION_INIT'),
    mergeMap(({ payload }) => {
      const { changes, locale, type } = payload;
      const changedIds = Object.keys(changes);
      if (changedIds.length < 1) return of(saveTranslationDone());

      const actionPayloads = {}

      changedIds.forEach((changedId) => {
        let id = changedId.replace('_description', '');
        if(!actionPayloads[id]) {// initialize
          actionPayloads[id] = { locale, type };
        }
        if (changedId.includes('_description')) {
          actionPayloads[id].description = changes[changedId];
        } else {
          actionPayloads[id].name = changes[changedId];
        }
      });

      const saveActions = MapToList(actionPayloads).map((p) => ({
        type: 'SAVE_TRANSLATION_INIT',
        payload: p
      }))

      saveActions.push({
        type: 'PUSH_TRANSLATION_DONE',
        payload: { prePayload: payload }
      });
      return saveActions;
    })
  );

const saveTranslationEpic = (action$: Observable) =>
  action$.pipe(
    ofType('SAVE_TRANSLATION_INIT'),
    mergeMap(({ payload }) => {
      return fromPromise(API.AddTranslation(payload)).pipe(
        map(() => ({
          type: 'SAVE_TRANSLATION_DONE',
          payload: { prePayload: payload }
        })),
        catchError(error => of({type: 'SAVE_TRANSLATION_FAIL', error}))
      );
    })
  );

const capitalize = (string) => string.charAt(0).toUpperCase() + string.slice(1);

const suggestTranslationEpic = (action$: Observable, state$) =>
  action$.pipe(
    ofType('SUGGEST_TRANSLATION_INIT'),
    mergeMap(({ payload: {form, text, field, from, to} }) => {

      const promise = Post(
        {endpoint: 'https://us-central1-tabb-global.cloudfunctions.net/', path: 'translate'},
        {text: text.toLowerCase(), from, to}
      );

      return fromPromise(promise).pipe(
        map((response) => {
          let suggestion = '';
          if (response.result) suggestion = response.result;
          return changeForm(form, field, capitalize(suggestion));
        }),
        catchError(error => of({type: 'PUSH_TRANSLATION_FAIL', error}))
      );
    })
  );

const suggestAllEpic = (action$, state$) =>
  action$.pipe(
    ofType('SUGGEST_ALLTRANSLATIONS_INIT'),
    mergeMap(({ payload: {form, originalsList, from, to} }) => {
      const fields = Object.keys(state$.value.form[form].registeredFields)
      return fields.map((field) => {
        let text = '';
        if (field.includes('_description')) {
          const prop = field.replace('_description', '');
          text = R.find(R.propEq('id', prop))(originalsList).description || '';
        } else {
          text = R.find(R.propEq('id', field))(originalsList).name || '';
        }
        return {
          type: 'SUGGEST_TRANSLATION_INIT',
          payload: {
            form,
            field,
            text,
            from,
            to
          }
        }
      });
    })
  );


export default [
  pushTranslationEpic,
  suggestTranslationEpic,
  suggestAllEpic,
  saveTranslationEpic
];
