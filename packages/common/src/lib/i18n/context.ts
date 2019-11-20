import { IntlContextType, IntlContext } from ".";
import { useContext } from "react";

// export function useIntl(): IntlContextType;
export function useIntl<T>(
  selector?: (ctx: IntlContextType) => T
): T {
  const context = useContext<IntlContextType>(IntlContext);
  if (selector) return selector(context);
  return context as any;
}
