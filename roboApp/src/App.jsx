import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import ArticleList from "./components/ArticleList";
import Privacy from "./components/Privacy";
import Robot from "./components/Robot";
import Navbar from "./components/Navbar";
import Contact from "./components/ContactForm";
import Creators from "./components/Creators";
import "./App.css";
import { ThemeProvider } from "./components/ThemeContext";
import ThemeToggle from "./components/ThemeToggle";

function App() {
  return (
    <Router>
      <ThemeProvider>
      <ThemeToggle/>
      <Header />
      <Navbar />
      <Routes>
        <Route
          path="/"
          element={
            <div>
              <ArticleList />
            </div>
          }
          />
        <Route path="/privacy" element={<Privacy />} />
        <Route path="/contact-us" element={<Contact />} />
        <Route path="/about" element={<Creators />} /> {/* New Route */}
      </Routes>
      <Robot />
      </ThemeProvider>
    </Router>
  );
}

export default App;
