import { CLDRFramework, LocaleMatcher, LocaleMatch, Locale } from "@phensley/cldr";
// Import default language directly so it's always available
import EnglishPack from '@phensley/cldr/packs/en.json';
import localizedLanguagesResource from './localized-languages.json';
import defaultLanguagesResource from './default-languages.json';
import wretch from 'wretch';
import { useStore } from "react-redux";

// IDEA: use ICU compiled to webassembly !
// or use @phensley/cldr

const packurl = `https://cdn.jsdelivr.net/npm/@phensley/cldr@0.19.1/packs`;

export const getDetectedLocale = (): LocaleMatch => {
  let value = navigator.language;
  if (value === '') {
    value = 'und';
  }
  return localeMatcher.match(value);
}

// Load English synchronously (see below)
const loader = (language: string): any => {
  // return require(`@phensley/cldr/packs/${language}.json`);
  return EnglishPack;
};

// Fetch the language resource pack for this version.
const asyncLoader = (language: string) =>
  wretch(`${packurl}/${language}.json`)
    .get()
    .json()
    .catch((err: Error) => console.log(err));

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
  .map(l => l.id);

export const supportedLanguages: string[] = allLocales
  .sort(l => (l.tag.expanded() === "en-Latn-US" ? -1 : 1))
  .map(l => l.tag.language())
  .reduce((unique: string[], item) => unique.includes(item) ? unique : [...unique, item], []);

export const defaultLanguages: string[] = supportedLanguages
  .filter(l => defaultLanguagesResource.includes(l));

export const localizedLanguages: { [key: string]: string } = localizedLanguagesResource;

export const getRegionsForLanguage = (language: string): string[] => allLocales
  .sort(l => (l.tag.expanded() === "en-Latn-US" ? -1 : 1))
  .filter(l => l.tag.language() === language)
  .map(l => l.tag.region())
  .reduce((unique: string[], item) => unique.includes(item) ? unique : [...unique, item], [])

export const localeMatcher = new LocaleMatcher(supportedLocales);

export const English = framework.get('en');

export const useLocaleState = (defaultLocale?: Locale) => {
  const state = useStore().getState();
  return state.locale || state.ui.locale || defaultLocale;
}

export type Namespace = 'app'|'dashboard'|'landing'|'waiterboard'|'common';

export let namespace: Namespace = 'common';
export const setNamespace = (ns: Exclude<Namespace, 'common'>) => {
  namespace = ns;
};

export { default as useBundle } from './useBundle';
export { default as useTranslation } from './useTranslation';