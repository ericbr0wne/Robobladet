import { createContext, useState, useEffect } from 'react';

const ThemeContext = createContext
();

const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState('light'); // Default till light mode

  // Laddar tema från localStorage vid initial rendering
  useEffect(() => {
    const storedTheme = localStorage.getItem('theme');
    if (storedTheme) {
      setTheme(storedTheme);
    }
  }, []);

  // Sparar tema till localStorage när det ändras
  useEffect(() => {
    localStorage.setItem('theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(theme === 'light' ? 'dark' : 'light');
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export { ThemeContext, ThemeProvider };