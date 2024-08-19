App.jsx;

import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import "./App.css";
import Main from "./main";
import Privacy from "./components/Privacypage";

function App() {
  return (
    <Router>
      <Route path="/" element={<Main />} />
      <Route path="/privacy" element={<Privacy />} />
    </Router>
  );
}

export default App;
