import React, { createContext, useContext } from 'react';

export interface NavigationState {
  selectedLanguage?: string,
  onSelect?: (language: string) => void
};

export interface NavigationContextType {
  state: NavigationState,
  setState: React.Dispatch<React.SetStateAction<NavigationState>>
  navigate: () => void
};

export const NavigationContext = createContext<NavigationContextType>({
  state: {},
  setState: () => { },
  navigate: () => { },
});

export const useNavigation = () => {
  return useContext(NavigationContext);
}

export { NavigationProvider } from './provider';