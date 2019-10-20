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

// IDEA: use ICU compiled to webassembly !

// TODO: move this to static.dinify.app
const packurl = `https://cdn.jsdelivr.net/npm/@phensley/cldr@0.19.4/packs`;
const staticRoot = "https://static.dinify.app";

export type Namespace =
  | "app"
  | "dashboard"
  | "landing"
  | "waiterboard"
  | "common";

export interface IntlState {
  namespace?: Exclude<Namespace, "common">;
  locale?: Locale;
  translations?: any;
  cldr: CLDR;
}

export type IntlConfig = Pick<IntlState, "namespace" | "locale">;

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

export const translatedNamespaces: Namespace[] = [
  "app",
  "common",
  "dashboard",
  "landing"
];

// fetch the language resource pack for this version
const asyncLoader = (language: string) =>
  wretch(`${packurl}/${language}.json`)
    .get()
    .json()
    .catch((err: Error) => console.log(err));

// translation loader
export const loadTranslations = ({
  locale = getDetectedLocale().locale,
  namespace
}: Pick<IntlState, "namespace" | "locale">) => {
  const language = locale.tag.language();
  const namespaces: Namespace[] = namespace
    ? ["common", namespace]
    : ["common"];
  return Promise.all(
    namespaces
      .filter(ns => translatedNamespaces.includes(ns))
      .map(cns => {
        return new Promise((resolve, reject) => {
          wretch(`${staticRoot}/i18n/translations/${language}/${cns}`)
            .get()
            .json(json => {
              resolve(json);
            })
            .catch(err => reject(err));
        });
      })
  )
    .then(values => {
      let aggr: any = {};
      values.forEach(v => {
        aggr = { ...aggr, ...v };
      });
      return aggr;
    })
    .catch(err => console.log(err));
};

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

export { IntlContext, useIntl } from "./context";
export * from "./provider";
export { default as useTranslation } from "./translations";
