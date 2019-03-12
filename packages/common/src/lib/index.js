import { parseLanguages } from './FN';
import languagesJSON from './languages.json';
import countriesJSON from './countries.json';
import currencyRatesJSON from './currencyRates.json';
import defaultCurrenciesJSON from './defaultCurrencies.json';
import currenciesJSON from './currencies.json';

export const languages = parseLanguages(languagesJSON);
export const countries = countriesJSON;
export const currencyRates = currencyRatesJSON;
export const defaultCurrencies = defaultCurrenciesJSON;
export const currencies = currenciesJSON;
