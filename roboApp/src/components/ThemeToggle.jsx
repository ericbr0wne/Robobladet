import React, { useContext } from 'react';
import { ThemeContext } from './ThemeContext';
import lightModeIcon from '../assets/images/dark.png'; // Importera bilderna
import darkModeIcon from '../assets/images/light.png';

const ThemeToggle = () => {
  const { theme, toggleTheme } = useContext(ThemeContext);

  return (
    <button className="theme-toggle" onClick={toggleTheme}>
      {theme === 'dark' ? (
        <img src={darkModeIcon} alt="Dark Mode" /> 
      ) : (
        <img src={lightModeIcon} alt="Light Mode" />
      )}
    </button>
  );
};
export default ThemeToggle;