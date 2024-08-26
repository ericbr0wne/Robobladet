import React, { useContext, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import ArticleList from "./components/ArticleList";
import Privacy from "./components/Privacy";
import Robot from "./components/Robot";
import Navbar from "./components/Navbar";
import Contact from "./components/ContactForm";
import Creators from "./components/Creators";
import "./App.css";
import { ThemeProvider, ThemeContext } from "./components/ThemeContext";
import ThemeToggle from "./components/ThemeToggle";
import "./index.css";

function App() {
  const { theme } = useContext(ThemeContext);

  useEffect(() => {
    document.body.setAttribute('data-theme', theme);
  }, [theme]);

  return (
    <div>
      <ThemeToggle />
      <Router>
        <Header />
        <Navbar />
        <Routes>
          <Route path="/" element={<ArticleList />} />
          <Route path="/privacy" element={<Privacy />} />
          <Route path="/contact-us" element={<Contact />} />
          <Route path="/about" element={<Creators />} />
        </Routes>
        <Robot />
      </Router>
    </div>
  );
}

export default App;
