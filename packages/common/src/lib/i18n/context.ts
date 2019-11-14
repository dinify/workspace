import { IntlContextType, IntlContext } from ".";
import { useContext } from "react";

export function useIntl<T = IntlContextType>(
  selector?: (ctx: IntlContextType) => T
): T {
  const context = useContext<IntlContextType>(IntlContext);
  if (!selector) return context as any;
  return selector(context);
}
