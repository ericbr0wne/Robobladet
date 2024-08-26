import React from "react";
import App from "./App";
import "./index.css";
import { ThemeProvider } from './components/ThemeContext';
import ReactDOM from 'react-dom/client';

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <ThemeProvider>
    <App />
  </ThemeProvider>
);