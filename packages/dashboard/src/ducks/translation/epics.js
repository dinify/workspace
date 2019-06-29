import { of, from as fromPromise } from 'rxjs';
import { mergeMap, map, catchError } from 'rxjs/operators';
import { ofType } from 'redux-observable';
import find from 'ramda/src/find';
import propEq from 'ramda/src/propEq';
import * as API from '@dinify/common/dist/api/restaurant';
import { Post } from '@dinify/common/dist/api/Network';
import { change as changeForm } from 'redux-form';
import { MapToList, handleEpicAPIError } from '@dinify/common/dist/lib/FN';
import { snackbarActions as snackbar } from 'material-ui-snackbar-redux'

const saveTranslationDone = () => {
  return { type: 'PUSH_TRANSLATION_DONE'}
}

const pushTranslationEpic = (action$) =>
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

const saveTranslationEpic = (action$, state$) =>
  action$.pipe(
    ofType('SAVE_TRANSLATION_INIT'),
    mergeMap((action) => {
      const { payload } = action;
      const restaurantId = state$.value.restaurant.selectedRestaurant;
      return fromPromise(API.AddTranslation({...payload, restaurantId})).pipe(
        map(() => ({
          type: 'SAVE_TRANSLATION_DONE',
          payload: { prePayload: payload }
        })),
        catchError(error => handleEpicAPIError({
          error,
          failActionType: 'SAVE_TRANSLATION_FAIL',
          initAction: action
        }))
      );
    })
  );

const capitalize = (string) => string.charAt(0).toUpperCase() + string.slice(1);

const suggestTranslationEpic = (action$) =>
  action$.pipe(
    ofType('SUGGEST_TRANSLATION_INIT'),
    mergeMap(({ payload: {form, text, field, from, to} }) => {

      const promise = Post(
        {endpoint: 'https://europe-west1-dinify.cloudfunctions.net/', path: 'translate'},
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
          text = find(propEq('id', prop))(originalsList).description || '';
        } else {
          text = find(propEq('id', field))(originalsList).name || '';
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

const confirmPreferredEpic = (action$, state$) =>
  action$.pipe(
    ofType('CONFIRM_PREFERRED_LANGUAGES'),
    mergeMap(() => {
      const preferredLanguages = state$.value.restaurant.preferredLanguages;
      return preferredLanguages.map((language) => {
        return {
          type: 'CREATE_MENULANGUAGE_INIT',
          payload: {
            language
          }
        }
      });
    })
  );

const translateAllEpic = (action$, state$) =>
  action$.pipe(
    ofType('TRANSLATE_ALL_INIT'),
    mergeMap((action) => {
      const promise = API.TranslateAll({
        restaurantId: state$.value.restaurant.selectedRestaurant
      })
      return fromPromise(promise).pipe(
        mergeMap(() => {
          const message = 'Translated successfully';
          return of({type: 'TRANSLATE_ALL_DONE'}, snackbar.show({ message }));
        }),
        catchError(error => handleEpicAPIError({
          error,
          failActionType: 'TRANSLATE_ALL_FAIL',
          initAction: action
        }))
      );
    })
  );

export default [
  pushTranslationEpic,
  suggestTranslationEpic,
  suggestAllEpic,
  saveTranslationEpic,
  confirmPreferredEpic,
  translateAllEpic
];
