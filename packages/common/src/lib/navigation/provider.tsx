import React, { useState } from "react";
import { NavigationState, NavigationContext } from '.';

export function NavigationProvider({ children }: React.PropsWithChildren<any>) {
  const [state, setState] = useState<NavigationState>({
    selectedLanguage: undefined
  });

  return (
    <NavigationContext.Provider
      value={{
        state,
        setState,
        navigate: () => { }
      }}
    >
      {children}
    </NavigationContext.Provider>
  );
}