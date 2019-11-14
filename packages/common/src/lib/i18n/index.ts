import {
  CLDR,
  CLDRFramework,
  LocaleMatcher,
  LocaleMatch,
  Locale
} from "@phensley/cldr";
import EnglishPack from "@phensley/cldr/packs/en.json";
import localizedLanguagesResource from "./localized-languages.json";
import defaultLanguagesResource from "./default-languages.json";
import wretch from "wretch";
import { createContext } from "react";

// IDEA: use ICU compiled to webassembly !
const staticRoot =
  process.env.NODE_ENV === "production"
    ? "static.dinify.app"
    : "static.dinify.dev";

export interface IntlState {
  locale: Locale;
  messages?: string[];
  cldr: CLDR;
}

export abstract class MessageConfig<T> {
  constructor(public schema: string[]) {}

  getId = (locale: Locale) => locale.tag.language;
  abstract getUri: (id: string) => string;
}

export type IntlConfig<T> = {
  locale?: Locale;
  messages: MessageConfig<T>;
};

export interface IntlContextType {
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
  wretch(`https://${staticRoot}/i18n/packs/${language}`)
    .get()
    .json()
    .catch((err: Error) => console.log(err));

// translation loader
export function loadMessages(config: IntlConfig): Promise<string[]> {
  const {
    locale = getDetectedLocale().locale,
    messages: { getId = (locale: Locale) => locale.tag.language() }
  } = config;
  return new Promise((resolve, reject) => {
    wretch(config.messages.getUri(getId(locale)))
      .get()
      .json(json => {
        resolve(json as string[]);
      })
      .catch(err => reject(err));
  });
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
  .sort(l => (l.tag.expanded() === "en-Latn-US" ? -1 : 1));

export const supportedLanguages: string[] = allLocales
  .sort(l => (l.tag.expanded() === "en-Latn-US" ? -1 : 1))
  .map(l => l.tag.language())
  .reduce(
    (unique: string[], item) =>
      unique.includes(item) ? unique : [...unique, item],
    []
  );

export const defaultLanguages: string[] = supportedLanguages.filter(l =>
  defaultLanguagesResource.includes(l)
);

export const localizedLanguages: {
  [key: string]: string;
} = localizedLanguagesResource;

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
  setLocale: () => {}
});

export { useIntl } from "./context";
export * from "./provider";
export { default as useTranslation } from "./translations";
export * from "./messages";
