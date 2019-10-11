import { useEffect, useState } from 'react';
import { Locale } from '@phensley/cldr';
import { English, framework, useLocaleState } from '.';

export default (defaultLocale?: Locale) => {
  const locale = useLocaleState(defaultLocale);
  const [cldr, setCldr] = useState(English);
  useEffect(() => {
    framework.getAsync(locale).then(cldr => {
      setCldr(cldr);
    });
  }, [locale]);
  return cldr;
};