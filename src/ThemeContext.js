import React, { useState, useContext, useEffect } from 'react';

const ThemeContext = React.createContext();

export function useTheme() {
  return useContext(ThemeContext);
}

export function ThemeProvider({ children }) {
  const [currentUser, setCurrentUser] = useState({});

  useEffect(() => {
    (async () => {
      const requestOptions = {
        method: 'GET',
        credentials: 'include',
      };
      const response = await fetch(
        'http://localhost:3033/login/currentuser',
        requestOptions
      );
      if (response.ok) {
        const _currentUser = await response.json();
        setCurrentUser((prev) => ({ ...prev, ..._currentUser }));
      }
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <ThemeContext.Provider value={{ currentUser, setCurrentUser }}>
      {children}
    </ThemeContext.Provider>
  );
}
