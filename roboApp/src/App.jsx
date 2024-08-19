import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import Main from "./main";
import Privacy from "./components/Privacy";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/privacy" element={<Privacy />} />
      </Routes>
    </Router>

  );
}

export default App;