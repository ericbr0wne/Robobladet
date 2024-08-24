import React, { useContext } from 'react';
import { ThemeContext } from './ThemeContext';

const ThemeToggle = () => {
  const { theme, toggleTheme } = useContext(ThemeContext);
console.log("Toggle TEST");
  return (
    <button onClick={toggleTheme}>
      {theme === 'dark' ? 'light' : 'dark'}
    </button>
  );
};

export default ThemeToggle;