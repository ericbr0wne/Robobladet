import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
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
  const isAuthenticated = () => {
    return localStorage.getItem("token") !== null;
  };

  const isUserRegistered = () => {
    return localStorage.getItem("userRegistered") === "true";
  };

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
        <Route
          path="/register"
          element={isUserRegistered() ? <Navigate to="/login" /> : <Register />}
        />
        <Route
          path="/login"
          element={
            isUserRegistered()
              ? isAuthenticated()
                ? <Navigate to="/" />
                : <Login />
              : <Navigate to="/register" />
          }
        />
        <Route
          path="*"
          element={<Navigate to={isAuthenticated() ? "/" : "/login"} />}
        />
      </Routes>
      <Robot />
    </Router>
  );
}

export default App;