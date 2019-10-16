import { of } from 'rxjs';
import { mergeMap } from 'rxjs/operators';
import { ofType } from 'redux-observable';
import { setCookie, getCookie } from '@dinify/common/dist/lib/FN';
import { actionTypes } from 'react-redux-firebase';

const languageHeaderEpic = (action$, state$) =>
  action$.pipe(
    ofType(actionTypes.SET_PROFILE),
    mergeMap(() => {
      const profile = state$.value.firebase.profile;
      if (profile.language) {
        let val = '';
        if (profile.language.primary) val += profile.language.primary;
        if (profile.language.other && profile.language.other.length > 0) {
          const len = profile.language.other.length;
          profile.language.other.forEach((lang, i) => {
            // distribute quality value weight and round to two decimal places
            const q = Math.floor(100 * ((len - i) / (len + 1))) / 100;
            val += `,${lang}:q=${q}`; // use colons instead of semicolons for cookie storage
          });
        }
        const curr = getCookie('lang');
        if (curr !== val) {
          setCookie('lang', val, 90);
          return of({ type: 'LANGUAGE_HEADER_UPDATED' });
        }
      }
      return of();
    })
  );

const languageSettingEpic = (action$, state$) =>
  action$.pipe(
    ofType(actionTypes.SET_PROFILE),
    mergeMap(() => {
      const { language } = state$.value.firebase.profile;
      if (language) {
        const val = JSON.stringify(language);
        const curr = getCookie('language');
        if (curr !== val) {
          setCookie('language', val, 90);

          // TODO: Get i18n instance from context instead of direct import
          // i18next.changeLanguage(language.primary);

          return of({ type: 'LANGUAGE_UPDATED' });
        }
      }
      return of();
    })
  );

export default [
  languageHeaderEpic,
  languageSettingEpic
];
