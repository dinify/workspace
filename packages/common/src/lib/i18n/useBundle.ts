import { useEffect, useState } from 'react';
import { Locale } from '@phensley/cldr';
import { English, framework, useLocaleState } from '.';
import once from '../util/once';

export default (defaultLocale?: Locale) => {
  const locale = useLocaleState(defaultLocale);
  const [cldr, setCldr] = useState(English);
  useEffect(() => {
    once(`bundle-${locale.id}`, () => new Promise(resolve => 
      framework.getAsync(locale).then(cldr => {
        resolve(cldr);
      }).catch(err => console.error(err))
    )).then(cldr => {
      setCldr(cldr);
    });
  }, [locale.id]);
  return cldr;
};