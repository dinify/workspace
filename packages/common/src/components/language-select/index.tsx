import React from 'react';
import FilledInput from '@material-ui/core/FilledInput';
import { supportedLocales, useIntl, nativeLanguageNames, IntlContextType } from '../../lib/i18n';
import { Locale } from '@phensley/cldr';
import NativeSelect from '@material-ui/core/NativeSelect';

interface Props {
  onChange?: (locale: Locale) => void,
  tags?: string[],
}

// source: https://github.com/thekelvinliu/country-code-emoji/blob/master/src/index.js
const getEmoji = (region: string) => {
  // offset between uppercase ascii and regional indicator symbols
  const OFFSET = 127397;

  const chars = [...region.toUpperCase().split('')].map(c => c.charCodeAt(0) + OFFSET);
  return String.fromCodePoint(...chars);
};


export const LanguageSelect = ({ tags, onChange }: Props) => {
  const { state: { locale }, setLocale } = useIntl<IntlContextType>();
  const changeLocale = (localeId: string) => {
    const newLocale = supportedLocales.find(l => l.id === localeId);
    if (newLocale) {
      setLocale(newLocale);
      if (onChange) onChange(newLocale);
    }
  }
  return <NativeSelect
    value={locale.id}
    onChange={(event) => { changeLocale(event.target.value); }}
    input={
      <FilledInput disableUnderline style={{ padding: 0 }} name="language" id="language-picker" />
    }
    inputProps={{
      style: { padding: '20px 32px 17px 12px' }
    }}
  >
    {supportedLocales
      .filter(l => (tags === undefined || tags.includes(l.id)))
      .map((locale) => (
        <option style={{ height: 24 }} key={locale.id} value={locale.id}>
          {`${getEmoji(locale.tag.region())} ${(nativeLanguageNames as any)[locale.tag.language()]}`}
        </option>
      ))}
  </NativeSelect>;
}