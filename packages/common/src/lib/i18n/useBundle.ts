import { useEffect, useState } from 'react';
import { Locale } from '@phensley/cldr';
import { English, framework } from '.';
import { useStore } from 'react-redux';

export default (locale?: Locale) => {
  const state = useStore().getState();
  const l = locale ? locale : state.locale;
  const [cldr, setCldr] = useState(English);
  useEffect(() => {
    framework.getAsync(l).then(cldr => {
      setCldr(cldr);
    });
  }, [l]);
  return cldr;
};