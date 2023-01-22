import { useState } from 'react';
import { Theme } from '@twilio-paste/core/theme';
import { Routes } from './routes';
import { GlobalContext } from './state/context';
import { ThemeMode } from './types';

export const App = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const globalContextValue = { isDarkMode, setIsDarkMode };

  return (
    <GlobalContext.Provider value={globalContextValue}>
      <Theme.Provider theme={isDarkMode ? ThemeMode.Dark : ThemeMode.Default}>
        <Routes />
      </Theme.Provider>
    </GlobalContext.Provider>
  );
};
