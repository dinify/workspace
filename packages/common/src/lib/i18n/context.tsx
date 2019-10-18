import React, { createContext, useState, useEffect, useContext } from 'react';
import { CLDR, Locale } from '@phensley/cldr';
import { English, getDetectedLocale, framework, localeMatcher } from '.';
import wretch from 'wretch';

export type Namespace = 'app'|'dashboard'|'landing'|'waiterboard'|'common';

interface OptionalLocale {
  namespace: Exclude<Namespace, 'common'>,
  locale?: Locale
  translations?: any,
  cldr: CLDR
}

export interface i18nState extends OptionalLocale {
  locale: Locale
};

export interface i18nContext {
  state: i18nState,
  setLocale: (locale: Locale|string) => any
};

let context: React.Context<i18nContext>;

/**
 * Instantiate the core logic with settings. Creates an internationalization context and provider.
 * Call this function before any rendering is taking place, in the root initializer of the app.
 * 
 * @param defaults The namespace and locale to create this i18n context for. Leave locale empty for detection.
 */
export const init = ({ 
  namespace,
  locale = getDetectedLocale().locale
}: Pick<OptionalLocale, 'namespace'|'locale'>) => {
  const initialState: i18nState = {
    namespace,
    locale,
    cldr: English
  };

  context = createContext<i18nContext>({
    state: initialState,
    setLocale: () => {}
  });

  const I18nProvider = (props: any) => {
    const [state, setState] = useState(initialState);
  
    // load of the bundles: initial on component mount and locale update
    useEffect(() => {
      const { locale, namespace } = state;
      if (!namespace) {
        console.error('Undefined namespace. The i18n.init() function needs to be called with a namespace argument');
      }
      // TODO: combine bundles somehow for better performance
      framework.getAsync(locale).then(cldr => {
        loadTranslations({ locale, namespace }).then(translations => {
          setState({ ...state, cldr, translations });
        });
      }).catch(err => console.error(err));
      
    }, [state.locale.id]);
    
    const setLocale = (action: Locale|string) => {
      let locale: Locale;
      if (typeof action === 'string') locale = localeMatcher.match(action as string).locale;
      else locale = action as Locale;

      setState({ ...state, locale });
    };
    console.log('State', {
      locale: state.locale.id, 
      cldr: state.cldr.General.locale().id, 
      translations: state.translations ? state.translations.gratuity : ''
    });
    return (
      <context.Provider value={{
        state,
        setLocale
      }}>
        {props.children}
      </context.Provider>
    );
  };

  return { context, I18nProvider };
};

export const usei18n = () => {
  return useContext(context);
};

const loadTranslations = ({ locale, namespace }: Pick<i18nState, 'namespace'|'locale'>) => {
  const staticRoot = 'https://static.dinify.app';
  const language = locale.tag.language();
  return Promise.all(['common', namespace].map(cns => {
    return new Promise((resolve, reject) => {
      wretch(`${staticRoot}/i18n/translations/${language}/${cns}`)
        .get()
        .json(json => {
          resolve(json);
        })
        .catch(err => reject(err));
    });
  })).then(values => {
    let aggr: any = {};
    values.forEach(v => {
      aggr = {...aggr, ...v};
    });
    return aggr;
  }).catch(err => console.log(err));
};