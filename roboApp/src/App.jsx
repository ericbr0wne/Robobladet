import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import ArticleList from "./components/ArticleList";
import Privacy from "./components/Privacy";
import Robot from "./components/Robot";
import Navbar from "./components/Navbar";
import Contact from "./components/ContactForm";
import Login from "./components/Login";
import Register from "./components/Register";
import "./App.css";

function App() {
  return (
    <Router>
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
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
      <Robot />
    </Router>
  );
}

export default App;