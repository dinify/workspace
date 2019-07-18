import { parseLanguages } from './FN';
import * as imageModule from './image';
import languagesJSON from './languages.json';
// import countriesJSON from './countries.json';
import languageCountriesJSON from './languageCountries.json';
import currencyRatesJSON from './currencyRates.json';
import defaultCurrenciesJSON from './defaultCurrencies.json';
import currenciesJSON from './currencies.json';

export const languageCountries = parseLanguages(languageCountriesJSON);
export const languages = languagesJSON;
// export const countries = countriesJSON;
export const currencyRates = currencyRatesJSON;
export const defaultCurrencies = defaultCurrenciesJSON;
export const currencies = currenciesJSON;
export const image = imageModule;
