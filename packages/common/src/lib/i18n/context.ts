import { createContext, useContext } from 'react';
import { 
  English, 
  getDetectedLocale,
  IntlState, 
  IntlContextType 
} from '.';

// TODO: load translation bundles syncrhonously
export const initialState: IntlState = {
  cldr: English,
  // locale: getDetectedLocale().locale
}

export const IntlContext = createContext<IntlContextType>({
  state: initialState,
  setLocale: () => {}
});

export const useIntl = (selector?: (ctx: IntlContextType) => any) => {
  const ctx = useContext(IntlContext);
  if (selector) return selector(ctx);
  return ctx;
};