import {
  CLDR,
  CLDRFramework,
  LocaleMatcher,
  LocaleMatch,
  Locale
} from "@phensley/cldr";
import EnglishPack from "@phensley/cldr/packs/en.json";
import wretch from "wretch";
import { createContext } from "react";
import nativeLanguageNames from "./native-names";
import defaultLanguages from "./default-languages";

// IDEA: use ICU compiled to webassembly !

// TODO: move these to ENV
const staticRoot =
  process.env.NODE_ENV === "production"
    ? "https://static.dinify.app"
    : "https://storage.googleapis.com/static.dinify.dev";

const version = '0.1.1';

export interface IntlState {
  locale: Locale;
  messages?: string[];
  cldr: CLDR;
}

export type IntlConfig = {
  locale?: Locale;
  namespace: string;
};

export interface IntlContextType {
  config: IntlConfig;
  state: IntlState;
  setLocale: (locale: Locale | string) => any;
}

export const getDetectedLocale = (): LocaleMatch => {
  let value = navigator.language;
  if (value === "") {
    value = "und";
  }
  return localeMatcher.match(value);
};

// load English synchronously so it's always available
const loader = (language: string): any => {
  // return require(`@phensley/cldr/packs/${language}.json`);
  return EnglishPack;
};

// fetch the language resource pack for this version
const asyncLoader = (language: string) =>
  wretch(`${staticRoot}/i18n/packs/${language}?v=${version}`)
    .get()
    .json()
    .catch((err: Error) => console.log(err));

// translation loader
export function loadMessages(config: IntlConfig): Promise<string[]> {
  const { locale = getDetectedLocale().locale } = config;
  let id = locale.tag.language();
  // Traditional and simplified chinese
  // have the script tag in their bundle identifier
  if (id === "zh") {
    id = `zh-${locale.tag.script()}`;
  }
  return new Promise((resolve, reject) => {
    wretch(`${staticRoot}/i18n/messages/${id}/${config.namespace}?v=${version}`)
      .get()
      .json(json => {
        resolve(json as string[]);
      })
      .catch(err => reject(err));
  });
}

export const getNativeName = (arg: string | Locale) => {
  const id = getTranslationId(arg);
  return (nativeLanguageNames as any)[id];
};

/**
 * Makes sure the argument is Locale type.
 * 
 * @param arg The input value can be a string or Locale
 */
export const coerce = (arg: string | Locale): Locale => {
  if (typeof arg === 'string') {
    return CLDRFramework.resolveLocale(arg);
  }
  return arg;
}

/**
 * The translation id is the key in the translations object received from the API.
 * Equivalent to the "locale" field in the translations tables in the database.
 * 
 * Appends script tag to the language tag in case of Chinese (zh)
 * to distinguish Simlified (zh-Hans) and Traditional (zh-Hant) scripts 
 */
export const getTranslationId = (arg: string | Locale) => {
  const tag = coerce(arg).tag;
  let id = tag.language();
  if (tag.language() === 'zh') {
    id = `zh-${tag.script()}`;
  }
  return id;
}

export const framework = new CLDRFramework({
  loader,
  asyncLoader,
  packCacheSize: 8,
  patternCacheSize: 50
});

const allLocales = CLDRFramework.availableLocales();

export const supportedLocales = allLocales
  // place the default locale at the front of the supported list
  .sort(l => (l.tag.expanded() === "en-Latn-US" ? -1 : 1))
  // filter for default languages list, do not disregard the region tag.
  .filter(l => {
    const translationId = getTranslationId(l);
    // Chinese is a special case, we cannot match the language
    if (translationId.includes('zh')) {
      return true;
    }
    return l.tag.language() === translationId;
  });

export const getRegionsForLanguage = (language: string): string[] =>
  allLocales
    .sort(l => (l.tag.expanded() === "en-Latn-US" ? -1 : 1))
    .filter(l => l.tag.language() === language)
    .map(l => l.tag.region())
    .reduce(
      (unique: string[], item) =>
        unique.includes(item) ? unique : [...unique, item],
      []
    );

export const localeMatcher = new LocaleMatcher(supportedLocales.map(l => l.id));

export const English = framework.get("en");

const initialState: IntlState = {
  cldr: English,
  locale: getDetectedLocale().locale
};

export const IntlContext = createContext<IntlContextType>({
  state: initialState,
  setLocale: () => { },
  config: {
    namespace: 'core'
  }
});

export { useIntl } from "./context";
export * from "./provider";
export { default as useTranslation } from "./translations";
export { nativeLanguageNames, defaultLanguages };
