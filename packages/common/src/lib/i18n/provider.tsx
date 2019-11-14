import React, { useState, useEffect } from "react";
import { Locale } from "@phensley/cldr";
import {
  getDetectedLocale,
  framework,
  localeMatcher,
  IntlConfig,
  IntlContext,
  loadMessages,
  English,
  IntlState
} from ".";
/**
 * Internationalization context provider.
 *
 * @param props The namespace and locale to create this i18n context for. Leave locale empty for detection.
 */

// getDetectedLocale().locale
// Pick<OptionalLocale, 'namespace'|'locale'>

export function IntlProvider(props: React.PropsWithChildren<IntlConfig>) {
  const { children, ...config } = props;
  const [state, setState] = useState<IntlState>({
    cldr: English,
    locale: config.locale || getDetectedLocale().locale
  });

  // load of the bundles: initial on component mount and locale update
  useEffect(() => {
    const { locale } = state;
    // TODO: combine bundles somehow for better performance
    loadMessages({ ...config, locale }).then(messages => {
      framework
        .getAsync(locale)
        .then(cldr => {
          setState({ ...state, cldr, messages });
        })
        .catch(err => {
          setState({ ...state, messages });
          console.error(err);
        });
    });
  }, [state.locale]);

  const setLocale = (action: Locale | string) => {
    let locale: Locale;
    if (typeof action === "string")
      locale = localeMatcher.match(action as string).locale;
    else locale = action as Locale;

    setState({ ...state, locale });
  };
  // console.log('State', {
  //   locale: state.locale.id,
  //   cldr: state.cldr.General.locale().id,
  //   translations: state.translations ? state.translations.gratuity : ''
  // });
  return (
    <IntlContext.Provider
      value={{
        config,
        state,
        setLocale
      }}
    >
      {props.children}
    </IntlContext.Provider>
  );
}
