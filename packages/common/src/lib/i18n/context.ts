import { IntlContextType, IntlContext } from ".";
import { useContext } from "react";

export function useIntl<T = IntlContextType>(
  selector?: (ctx: IntlContextType) => T
): T {
  const ctx = useContext(IntlContext);
  if (selector) return selector(ctx);
  return ctx as any;
}
