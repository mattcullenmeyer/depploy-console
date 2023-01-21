import { createContext, useContext } from 'react';

interface GlobalContextType {
  isDarkMode: boolean;
  setIsDarkMode: (isDarkMode: boolean) => void;
}

export const GlobalContext = createContext<GlobalContextType>({
  isDarkMode: false,
  setIsDarkMode: () => {},
});

export const useGlobalContext = () => useContext(GlobalContext);
