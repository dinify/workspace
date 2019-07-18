import aliases from './languageAliases';
import _ from 'lodash';

export const getLanguageAlias = (lang) => {
  const alias = aliases[lang];
  if (!alias) return null;
  return alias._replacement;
}
