import { useEffect, useState } from 'react';
import { Locale } from '@phensley/cldr';
import { English, framework, useLocaleState } from '.';
import once from '../util/once';

export default (defaultLocale?: Locale) => {
  const locale = useLocaleState(defaultLocale);
  const [cldr, setCldr] = useState(English);
  useEffect(() => {
    once(`useBundle-${locale.id}`, () => new Promise(resolve => 
      framework.getAsync(locale).then(cldr => {
        resolve(cldr);
      })
    )).then(cldr => {
      setCldr(cldr);
    });
  }, [locale.id]);
  return cldr;
};